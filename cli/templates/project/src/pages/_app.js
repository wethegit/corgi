import AppContextProviders from "../containers/app-context-providers";
import Page from "../containers/page";
import PageTransition from "../components/page-transition/page-transition";
import { useRouter } from "next/router";

import "../styles/globals.scss";

function App({ Component, pageProps }) {
  const router = useRouter();

  return (
    <AppContextProviders {...pageProps}>
      <Page {...pageProps}>
        {/* The page component, as exported by an index.js file inside /src/pages: */}
        <PageTransition
          location={router.pathname}
          options={pageProps.transition}
        >
          <Component {...pageProps} />
        </PageTransition>
      </Page>
    </AppContextProviders>
  );
}

export default App;
