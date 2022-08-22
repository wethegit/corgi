import { useCallback, useEffect, useState } from "react"

/**
 *
 * @param {Function} asyncFn - The asynchronous function to run
 * @param {Boolean} [deferred=false] - whether to save the function to a variable
 * for later use (true) or run it instantly (false).
 * @returns {Object} Properties include a run() function which is used to subsequently
 * call the function (if deferred); the resulting data; and the status and error states.
 *
 * @example
 * Run it instantly:
 * const { data, status, error } = useAsync(fetch("https://my-cool-api.com/some-endpoint"))
 * console.log(data)
 *
 * Deferred execution:
 * const { run, data, status, error } = useAsync(fetch("https://my-cool-api.com/some-endpoint"))
 * const handleClick = (event) => run()
 *
 */
const useAsync = (asyncFn, deferred = false) => {
  const [status, setStatus] = useState("idle")
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  // Wrapping the call to the async function in a callback which manages some state
  // around the function itself. This also has the benefit of "caching" it, so the asyncFn
  // won't get redeclared on every render:
  const run = useCallback(() => {
    setStatus("pending")

    return asyncFn()
      .then((res) => {
        setData(res)
        setStatus("success")
      })
      .catch((err) => {
        // console.log(err)
        setError(err)
        setStatus("error")
      })
  }, [asyncFn])

  // Default is to call run() as soon as the hook is used, but you can also "defer" its
  // usage, since it's stored in the returned "run" value:
  useEffect(() => {
    if (!deferred) run()
  }, [deferred, run])

  return { run, data, status, error }
}

export default useAsync
