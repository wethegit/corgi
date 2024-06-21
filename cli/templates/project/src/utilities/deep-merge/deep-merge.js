/**
 * Merges two or more objects into one. If a given property value exists on both,
 * but have different *types*, the last one specified will take precedence,
 * overwriting the property with *it's* value.
 * 
 * @param {Object} merged - the initial source object.
 * @param  {...Object} rest - remaining arguments to be merged sequentially.
 * @returns {Object} - the object resulting from the merge.
 * 
 * @example 
 * This example establishes some global defaults, and then overrides only what it needs
 * to, based on the specific locale:
 * 
 * deepMerge(
 *  {},
    {
      items: [
        { id: "home", path: "/", label: "Home" },
        { id: "about", path: "/about-us", label: "About us" },
        { id: "contact", path: "/contact", label: "Contact us" },
      ],
    },
    {
      items: [
        { label: "À propos de nous" },
        { label: "À propos de nous" },
        { label: "Contactez-nous" },
      ],
    },
 * )
 */
export function deepMerge(merged, ...rest) {
  if (!Array.isArray(merged) && !isObject(merged)) return merged;
  if (!rest.length) return merged;

  const current = rest.shift();

  if (Array.isArray(current)) mergeArray(merged, current);
  else if (isObject(current)) mergeObject(merged, current);

  return deepMerge(merged, ...rest);
}

/**
 * Returns whether or not the provided value is an object.
 * 
 * @param {any} value
 * @returns {boolean}
 */
function isObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

/**
 * Merges a given array into another. Destructive; mutates the destination value.
 * 
 * ⚠️ Warning: If an array item is an object, a recursive deep-merge will be performed
 * on it. Primitive types will simply be pushed to the destination array.
 * 
 * @param {Array} dest - The destination array to merge *into*.
 * @param {Array} source - The array to merge into the destination.
 */
function mergeArray(dest, source) {  
  source.forEach((item, i) => {
    if (Array.isArray(item)) {
      if (!dest[i]) dest[i] = [];
      dest[i] = deepMerge(dest[i], item);
    } else if (isObject(item)) {
      if (!dest[i]) dest[i] = {};
      dest[i] = deepMerge(dest[i], item);
    } else {
      dest.push(item);
    }
  });
}

/**
 * Merges a given object into another. Destructive; mutates the destination value.
 * 
 * @param {Object} dest - The destination object to merge *into*.
 * @param {Object} source - The object to merge into the destination.
 */
function mergeObject(dest, source) {
  for (let [key, value] of Object.entries(source)) {
    if (Array.isArray(value)) {
      if (!dest[key] || !Array.isArray(dest[key])) dest[key] = [];
      dest[key] = deepMerge(dest[key], value);
    } else if (isObject(value)) {
      if (!dest[key] || !isObject(dest[key])) dest[key] = {};
      dest[key] = deepMerge(dest[key], value);
    } else {
      dest[key] = value;
    }
  }
}