import { useEffect } from "react"
import { useRouter } from "next/router"

import { setupPaths, setupProps } from "@local/utilities"
import { HomeLayout } from "@local/layouts"
import { defaultLocale } from "@local/config-locales"
import { useLocale } from "@local/hooks"

const LOCALE_FOLDER = "home"

export default function Home() {
  const router = useRouter()
  const { locale } = useLocale()

  /*
    We need to check the locale, if its
    the same as the default we'll redirect
    them to the root url. For example if
    this page is site.com/en/ and the default
    locale is en we'll redirect to site.com and
    this page will remain blank
  */

  useEffect(() => {
    if (locale === defaultLocale) router.push(`/`)
  }, [locale, router])

  /*

    ** NO PAGE CONTENT OR LOGIC HERE. **

    The homepage can be rendered here or
    in ~/src/pages/index.js so it needs
    to be a shared component:

    src/components/home-page-contents

  */

  return <HomeLayout />
}

export const getStaticPaths = async () => setupPaths(LOCALE_FOLDER)
export const getStaticProps = async (ctx) => setupProps(ctx, LOCALE_FOLDER)
