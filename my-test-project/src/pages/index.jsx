import { setupProps } from "@local/utils"

import { HomeLayout } from "@local/components/layouts"
import { PageProvider } from "@local/context"

const LOCALE_FOLDER = "home"

export default function RootRedirect({ ...pageProps }) {
  /*

    ** NO PAGE CONTENT OR LOGIC HERE. **

    The homepage can be rendered here or
    in ~/src/pages/locales/index.js so it
    needs to be a shared component:

    src/components/home-page-contents

  */

  return (
    <PageProvider page={LOCALE_FOLDER}>
      <HomeLayout {...pageProps} />
    </PageProvider>
  )
}

export const getStaticProps = async (ctx) => setupProps(ctx, LOCALE_FOLDER)
