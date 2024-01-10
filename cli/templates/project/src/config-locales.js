/**
 * Add your required locales here, along with any mapping to specifically-formatted
 * strings. For example, if your locale string differs from the ISO standard
 * abbreviation, you can add that here.
 *
 * The mapped object value will be available from the useLocale hook as `localeMap`.
 */
const localeMap = {
  en: {
    language: "en-US",
  },
  es: {
    language: "es-ES",
  },
  fr: {
    language: "fr-FR",
  },
}

module.exports = {
  defaultLocale: "en",
  localeMap,

  /** Both <html lang=""> and <Link hreflang ... /> tags are auto generated for every
   * page. The value for those will default to the locale slug (i.e. "en", "fr", etc.),
   * unless an alternative property defined the localeMap is specified here:
   */
  langValue: "language",
}
