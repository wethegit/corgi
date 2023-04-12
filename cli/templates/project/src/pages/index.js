import { setupProps } from "@local/utils/page-setup"

import HomePageContents from "@local/components/home-page-contents/home-page-contents"
import PageProvider from "@local/context/page-context"

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
      <HomePageContents {...pageProps} />
    </PageProvider>
  )
}

export const getStaticProps = async (ctx) => setupProps(ctx, LOCALE_FOLDER)
