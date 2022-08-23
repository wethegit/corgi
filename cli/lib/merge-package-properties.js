const mergePkgProperties = ({ existing, custom }) => {
  const merged = { ...existing };
  const validProps = ["name", "scripts", "dependencies", "devDependencies"];

  for (const [key, value] of Object.entries(custom)) {
    if (!validProps.includes(key)) continue;

    if (typeof value === "string") {
      merged[key] = custom[key];
    } else if (Array.isArray(value)) {
      merged[key] = [...merged[key], ...custom[key]];
    } else if (typeof value === "object") {
      merged[key] = { ...merged[key], ...custom[key] };
    } else {
      continue;
    }
  }

  return merged;
};

export default mergePkgProperties;
