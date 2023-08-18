/**
 * Add your required locales here, along with any mapping to specifically-formatted
 * strings. For example, if your locale string differs from the ISO standard
 * abbreviation, you can add that here.
 *   
 * The mapped object value will be available to both the Page's pageProps and the
 * useLocales hook as `localeMap`. If the locale is missing from the map then
 * localeMaps will be an empty object.
 */
const localeMap = new Map([
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
]);


/**
 * Make just the locale slugs available (i.e. ["en", "fr", etc.]):
 */
const locales = Array.from(localeMap.keys())

module.exports = {
  defaultLocale: "en",
  locales,
  localeMap,

  /** Both <html lang=""> and <Link hreflang ... /> tags are auto generated for every
   * page. The value for those will default to the locale slug (i.e. "en", "fr", etc.),
   * unless an alternative property defined the localeMap is specified here:
   */
  langValue: "language",
}
