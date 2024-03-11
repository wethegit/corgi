import { useLocale } from "@local/hooks"

export function HomeBody() {
  const {
    locale,
    localeMap,
    globals: { version, coolSetting },
    page: { pageCoolSetting },
  } = useLocale()

  return (
    <>
      <h2>
        locale: <code>{locale}</code>
      </h2>

      <ul>
        {Object.entries(localeMap).map(([key, value]) => (
          <li key={key}>
            <b>{key}:</b> <span>{JSON.stringify(value, null, 2)}</span>
          </li>
        ))}
      </ul>

      <h2>
        Version: <code>{version}</code>
      </h2>

      <p>{coolSetting}</p>

      <p>{pageCoolSetting}</p>
    </>
  )
}
