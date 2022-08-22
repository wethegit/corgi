// TODO: everything

const createPage = ({ slug, locale }) => {
  // STEPS:
  // - create sub-directories for the page in src/pages and src/locales.
  // - write data to the page and locale files from some page boilerplate template.
};

const page = ({ pages }) => {
  let items = [];
  if (!Array.isArray(pages) && typeof pages === "string") items.push(pages);
  else items = [...pages];

  // items.forEach((slug) => createPage({ slug, locale }));
};

export default page;
