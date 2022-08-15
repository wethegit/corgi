module.exports = {
  defaultLocale: "en",

  /*
    locales here are not used to generate pages,
    however is it useful to store the languages
    you intend to support here.
  */

  locales: ["en", "es", "fr"],

  /* 
    Both <html lang=""> and <Link hreflang ... /> 
    tags are auto generated for every page. The 
    value for those will default to the locale 
    unless an alternative in the localeMap 
    (see below) is defined here.
  */

  langValue: "language",

  /* 
    if you need to map your locales to specific
    alternatives then add them here. The mapped
    object will be available to the page and
    useLocales hook as localeMaps. If the locale
    is missing from the map then localeMaps will
    be an empty object
  */

  localeMap: new Map([
    [
      "en",
      {
        language: "en-US",
      },
    ],
    [
      "es",
      {
        language: "es-ES",
      },
    ],
    [
      "fr",
      {
        language: "fr-FR",
      },
    ],
  ]),
}
