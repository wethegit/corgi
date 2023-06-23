import { useLocale } from "@local/hooks"

export function HomeBody({ version }) {
  const { locale, localeMap } = useLocale()

  return (
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
  )
}
