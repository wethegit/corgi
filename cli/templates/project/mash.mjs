import { join } from "node:path"

import { glob } from "glob"
import fs from "fs-extra"
import sizeOf from "image-size"
import chalk from "chalk"
import md5File from "md5-file"
import watch from "node-watch"
import sharp from "sharp"

import config from "./mash.config.js"

const MASH_NAME = "masher"
const CACHE_NAME = "MashCache"
const CACHE_FILE = "./mash.cache.json"
const IMAGES_REGISTER_FILE = "./images_register.json"

const BREAKPOINTS = ["xxlarge-up", "xlarge-up", "large-up", "medium-up"]

const FOLDERS = {
  output: "public/_images/",
  input: "src/images/",
}

const PROCESS_TYPE = {
  auto: "auto",
  defined: "defined",
}

const ACTION_TYPE = {
  delete: "delete",
  compress: "compress",
}

const LOG_TYPE = {
  read: "read",
  write: "write",
  error: "error",
  message: "msg",
  deleted: "deleted",
}

const args = process.argv.slice(2)
const watching = args.includes("--watch")
const clearAllOuput = args.includes("--force-remash")
const forceRegisterRewrite = args.includes("--force-register")
const prettyRegister = args.includes("--pretty-register")

let cache = {}
let queue = []
let isProcessingQueue = false

const log = (type, message, extra) => {
  const colorMap = {
    [LOG_TYPE.read]: "blue",
    [LOG_TYPE.write]: "green",
    [LOG_TYPE.error]: "red",
    [LOG_TYPE.deleted]: "magenta",
    [LOG_TYPE.message]: "dim",
  }
  console.log(
    chalk.yellow(MASH_NAME),
    (type != LOG_TYPE.message ? chalk[colorMap[type]](type) + " " : "") +
      "- " +
      chalk[type == LOG_TYPE.error ? colorMap[type] : "white"](message)
  )
  if (extra) console.log(`       ⨽ ${extra}`)
}

const loadCache = () => {
  try {
    let cacheData = fs.readJsonSync(CACHE_FILE)
    log(LOG_TYPE.message, `${CACHE_NAME} loaded`)
    if (cacheData) cache = cacheData
  } catch (err) {
    log(LOG_TYPE.message, `No ${CACHE_NAME} found. Creating a new one...`)
    cache = {}
    saveCache()
  }
}

const saveRegister = () => {
  let register = {}

  if (config.useImageRegister) {
    Object.keys(cache).forEach((key) => {
      let item = cache[key]
      let shortPath = item.filename
      if (item.process === PROCESS_TYPE.defined) {
        let bp = null
        for (let i = 0; i < BREAKPOINTS.length; i++) {
          const _bp = BREAKPOINTS[i]
          if (shortPath.includes(_bp)) {
            shortPath = shortPath.replace("-" + _bp, "")
            bp = _bp
            break
          }
        }

        if (!register[shortPath]) {
          register[shortPath] = {
            e: [...item.types].reverse(),
            b: [],
            s: {},
          }
        }
        if (bp) {
          register[shortPath].b.push(bp)
          register[shortPath].s[bp] = {
            w: item.size.width * (item.is2x ? 0.5 : 1),
            h: item.size.height * (item.is2x ? 0.5 : 1),
          }
        } else {
          register[shortPath].w = item.size.width * (item.is2x ? 0.5 : 1)
          register[shortPath].h = item.size.height * (item.is2x ? 0.5 : 1)
        }
      } else {
        register[shortPath] = {
          w: item.size.width,
          h: item.size.height,
          e: [...item.types].reverse(),
        }
      }
    })
  }
  fs.writeJsonSync(IMAGES_REGISTER_FILE, register, prettyRegister ? { spaces: 2 } : {})
}

const saveCache = () => {
  fs.writeJsonSync(CACHE_FILE, cache, { spaces: 2 })
  saveRegister()
}

const hasFileChanged = (path, hash) => {
  // Not in cache
  if (!cache[path]) return true
  // Hash is different
  if (cache[path].hash !== hash) return true
  // Job didn't finish previously
  if (!cache[path].count || cache[path].count !== cache[path].generatedFiles.length)
    return true
  // Not changed
  return false
}

const isValidFileType = (type) => {
  const ext = type.split(".").pop()
  return config.validTypes.indexOf(ext) >= 0
}

const addToQueue = (queueItem) => {
  queue.push(queueItem)
  if (!isProcessingQueue) startQueue()
}

const removeFromQueue = (path) => {
  queue = queue.filter((d) => d.path !== path)
}

const startQueue = () => {
  isProcessingQueue = true
  processQueue()
  log(LOG_TYPE.message, "Queue started")
}

const processQueue = async () => {
  if (queue.length > 0) {
    const item = queue.shift()

    if (!fs.existsSync(item.output)) {
      fs.mkdirSync(item.output, { recursive: true })
    }

    const outputs = []
    const image = sharp(item.path).resize({ width: item.width, failOn: "none" })

    console.log({ item })

    item.outputTypes.forEach((type) => {
      const newImagePath = `${item.output}${item.filename}.`

      switch (type) {
        case "png":
          // png options
          // https://sharp.pixelplumbing.com/api-output#png
          image.clone().png()
          break
        case "jpg":
        case "jpeg":
          // jpeg options
          // https://sharp.pixelplumbing.com/api-output#jpeg
          image.clone().jpeg()
          break
        case "webp":
          // webp options
          // https://sharp.pixelplumbing.com/api-output#webp
          image.clone().webp({ nearLossless: true })
          break
        case "avif":
          // avif options
          // https://sharp.pixelplumbing.com/api-output#avif
          image.clone().avif({ nearLossless: true })
          break
      }

      const path = newImagePath + type

      outputs.push(image.toFile(path))
      cache[item.path].generatedFiles.push(path)

      log(LOG_TYPE.write, path)
    })

    await Promise.all(outputs)

    saveCache()
    processQueue()
  } else {
    endQueue()
  }
}

const endQueue = () => {
  isProcessingQueue = false
  log(LOG_TYPE.message, "Queue complete")
}

const getFileInfo = (path, processType) => {
  let width = null
  let height = null
  let type = null

  try {
    const size = sizeOf(path)
    width = size.width
    height = size.height
    type = size.type
  } catch (err) {
    log(LOG_TYPE.error, "Could not load file", path)
    return null
  }

  const is2x = path.includes("-x2") || path.includes("-2x") || path.includes("@2x")
  const split = path.replace(FOLDERS.input + processType + "/", "").split("/")
  const filename = split.pop().split(".")[0].replace("-2x", "")
  const newPath = split.join("/") + "/"
  const ratio = width / height

  return {
    path: newPath,
    filename,
    ext: type,
    width,
    height,
    is2x,
    ratio,
  }
}

const deleteFiles = (path) => {
  if (cache[path]) {
    // remove tasks related to this path from the queue
    removeFromQueue(path)
    const filesToDelete = cache[path]?.generatedFiles || []
    filesToDelete.forEach((d) => {
      fs.remove(d)
      log(LOG_TYPE.deleted, d)
    })
    delete cache[path]
    saveCache()
  }
}

const processDefinedImage = (path, hash, fileInfo) => {
  const outputTypes = [fileInfo.ext]
  if (fileInfo.ext === "png") outputTypes.push("webp")

  cache[path] = {
    hash,
    filename: join(fileInfo.path, fileInfo.filename + "." + outputTypes[0]),
    size: { width: fileInfo.width, height: fileInfo.height },
    count: 0,
    is2x: fileInfo.is2x,
    process: PROCESS_TYPE.defined,
    types: outputTypes,
    generatedFiles: [],
  }

  const add = (filename, width, height) => {
    cache[path].count += outputTypes.length

    addToQueue({
      path,
      output: join(FOLDERS.output, fileInfo.path),
      filename,
      width,
      height,
      outputTypes,
    })
  }

  add(fileInfo.filename + (fileInfo.is2x ? "-2x" : ""), fileInfo.width)
  if (fileInfo.is2x)
    add(fileInfo.filename, Math.ceil(fileInfo.width / 2), Math.ceil(fileInfo.height / 2))

  saveCache()
}

const processAutoImage = (path, hash, fileInfo) => {
  const outputTypes = [fileInfo.ext]
  if (fileInfo.ext === "png") outputTypes.push("webp")

  cache[path] = {
    hash,
    filename: join(fileInfo.path, fileInfo.filename + "." + outputTypes[0]),
    size: { width: fileInfo.width, height: fileInfo.height },
    count: 0,
    process: PROCESS_TYPE.auto,
    types: outputTypes,
    generatedFiles: [],
  }

  const targetWidth = fileInfo.width
  const sizes = []
  for (
    let size = config.imageSizeStepAmount;
    size <= targetWidth;
    size += config.imageSizeStepAmount
  ) {
    sizes.push(size)
  }
  if (sizes[sizes.length - 1] !== targetWidth) sizes.push(targetWidth)

  for (const size of sizes) {
    const stepName = size === config.imageSizeStepAmount ? "" : `-${size}`
    // const squooshImage = imagePool.ingestImage(image)
    // await squooshImage.decoded
    cache[path].count += outputTypes.length

    addToQueue({
      path,
      output: join(FOLDERS.output, fileInfo.path),
      filename: fileInfo.filename + stepName,
      width: size,
      outputTypes,
    })
  }

  saveCache()
}

const processPath = (path, action) => {
  const processType = path.replace(FOLDERS.input, "").split("/").shift().trim()

  const validProcessTypes = Object.keys(PROCESS_TYPE)
  console.log({ validProcessTypes, processType })
  if (validProcessTypes.indexOf(processType) === -1) {
    log(
      LOG_TYPE.error,
      `No process to handle items in the '${processType}' folder`,
      `valid folders are ${validProcessTypes.map((d) => `'${d}'`).join(", ")}`
    )
    return
  }

  if (!isValidFileType(path) && action === ACTION_TYPE.compress) {
    if (!path.includes(".DS_Store")) log(LOG_TYPE.error, `Invalid file type`, path)
    return
  }

  switch (action) {
    case ACTION_TYPE.delete:
      const isDirectory = !path.slice(1, -1).includes(".")

      if (isDirectory) {
        // a directory was deleted so we need to make a list of
        // files from the cache that were in that folder
        let removedPaths = Object.keys(cache)
          .filter((p) => p.includes(path))
          .forEach((p) => deleteFiles(p))
      } else {
        if (cache[path]) {
          deleteFiles(path)
        } else {
          log(LOG_TYPE.message, `file ${path} was removed but not found in cache`)
        }
      }
      break
    case ACTION_TYPE.compress:
      const fileInfo = getFileInfo(path, processType)
      if (fileInfo) {
        const hash = md5File.sync(path)
        if (hasFileChanged(path, hash)) {
          log(LOG_TYPE.read, path)
          switch (processType) {
            case PROCESS_TYPE.defined:
              processDefinedImage(path, hash, fileInfo)
              break
            case PROCESS_TYPE.auto:
              processAutoImage(path, hash, fileInfo)
              break
          }
        } else {
          // log(LOG_TYPE.message, `file hasn't changed since last ${action}`)
        }
      }
      break
    default:
      log(LOG_TYPE.error, `No process for action: ${action}`)
  }
}

const checkAll = () => {
  const files = glob.sync(join(FOLDERS.input, "**/*.*"))

  // check for files deleted while masher wasn't running

  Object.keys(cache).forEach((cacheFile) => {
    if (!files.includes(cacheFile)) {
      processPath(cacheFile, ACTION_TYPE.delete)
    }
  })

  // check for files added while masher wasn't running

  for (let i = 0; i < files.length; i++) {
    const path = files[i]
    console.log({ path })
    processPath(path, ACTION_TYPE.compress)
  }

  if (queue.length === 0 && !watching) {
    log(LOG_TYPE.message, "Nothing to mash.")
    if (forceRegisterRewrite) saveRegister()
  }
}

if (clearAllOuput) {
  try {
    fs.rmSync(FOLDERS.output, { recursive: true })
    saveCache()
    log(LOG_TYPE.message, `${FOLDERS.output} is deleted!`)
  } catch (err) {
    log("error", `Error while deleting ${FOLDERS.output}.`)
  }
}

loadCache()
checkAll()

if (watching) {
  watch(FOLDERS.input, { recursive: true }, function (evt, name) {
    if (queue && !queue.length) {
      /*
        if we're not currently processing anything in the
        queue we should load a fresh version of the cache.
        This helps in scenarios like if the masher is running
        while changing to a much older/newer branch
      */

      loadCache()
    }

    if (evt === "remove") {
      processPath("./" + name, ACTION_TYPE.delete)
    } else {
      processPath("./" + name, ACTION_TYPE.compress)
    }
  })
}
