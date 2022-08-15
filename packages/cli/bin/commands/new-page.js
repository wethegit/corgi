// TODO: everything

const createPage = ({ slug, locale }) => {
  // STEPS:
  // - create pages and locales directories if they doesn't exist.
  // - write data to a page file from some page boilerplate template
  // - do the same for the locale file
};

const newPage = ({ pages }) => {
  let items = [];
  if (!Array.isArray(pages) && typeof pages === "string") items.push(pages);
  else items = [...pages];

  // items.forEach((slug) => createPage({ slug, locale }));
};

export default newPage;
