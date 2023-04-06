import { useEffect } from "react"
import { useRouter } from "next/router"

import { setupPaths, setupProps } from "#utils/page-setup"
import { defaultLocale } from "../../config-locales"

import HomePageContents from "#components/home-page-contents/home-page-contents"
import PageProvider from "#context/page-context"

const LOCALE_FOLDER = "home"
const Home = ({ locale, ...pageProps }) => {
  const router = useRouter()

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

  return (
    <PageProvider page={LOCALE_FOLDER}>
      {locale != defaultLocale && <HomePageContents {...pageProps} />}
    </PageProvider>
  )
}

export const getStaticPaths = () => setupPaths(LOCALE_FOLDER)
export const getStaticProps = async (ctx) => setupProps(ctx, LOCALE_FOLDER)

export default Home
