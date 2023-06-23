import { Html, Head, Main, NextScript } from "next/document"

import { defaultLocale } from "../config-locales"

/**
 * Use this component to add app-wide meta tags, add class names to the body, etc.
 * https://nextjs.org/docs/advanced-features/custom-document
 *
 * All page-level meta tags should use the `components/head.js` component.
 *
 * For importing third-party scripts, see the next/script docs:
 * https://nextjs.org/docs/basic-features/script
 */
export default function Document() {
  return (
    <Html lang={defaultLocale}>
      <Head>
        <meta content="website" property="og:type" />
        <meta
          content={`${process.env.NEXT_PUBLIC_URL}/images/share-fb.jpg`}
          property="og:image"
        />
        <meta
          content={`${process.env.NEXT_PUBLIC_URL}/images/share-tw.jpg`}
          name="twitter:image"
        />

        {/* FAVICONS (more defined in manifest.json) */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/favicons/apple-touch-icon.png" />
        <link rel="icon" href="/favicons/favicon.svg" type="image/svg+xml" />

        {/* MANIFEST (and some progressive enhancement meta tags): */}
        <link href="/manifest.json" rel="manifest" />
        <meta name="theme-color" content="#fff" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />

        {/* FONTS */}
        {/* Next automatically handles any preconnect link tags for Google and Typekit 🔥 */}
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans&family=Poppins:wght@700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body data-env={process.env.NODE_ENV}>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
