import { setupProps } from "@local/utils"

import { HomeLayout } from "@local/components/layouts"

const LOCALE_FOLDER = "home"

export default function RootRedirect() {
  /*

    ** NO PAGE CONTENT OR LOGIC HERE. **

    The homepage can be rendered here or
    in ~/src/pages/locales/index.js so it
    needs to be a shared component:

    src/components/home-page-contents

  */

  return <HomeLayout localeFolder={LOCALE_FOLDER} />
}

export const getStaticProps = async (ctx) => setupProps(ctx, LOCALE_FOLDER)
