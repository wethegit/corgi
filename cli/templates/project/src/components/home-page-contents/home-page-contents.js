import useLocale from "#hooks/use-locale"

const HomePageContents = ({ version }) => {
  const { locale, page, globals, localeMap } = useLocale()

  return (
    <>
      <header className="content-spacing">
        <h1>{page.title}</h1>
        <p>{page.subtitle}</p>
      </header>
      <main className="content-spacing">
        <h2>
          locale: <code>{locale}</code>
        </h2>
        <ul>
          {Object.keys(localeMap).map((key) => (
            <li key={key}>
              <b>{key}:</b> <span>{localeMap[key]}</span>
            </li>
          ))}
        </ul>
        <h2>
          Version: <code>{version}</code>
        </h2>
      </main>
    </>
  )
}

export default HomePageContents
