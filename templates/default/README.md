# WTC - Next.js starter

A boilerplate for creating statically-exported, localized React web applications with Next.js  

To learn more about Next.js, take a look at the following resources:
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

To learn more about React, check out the [React documentation](https://reactjs.org/docs/getting-started.html).

---

You can treat _most_ of this project as you would any other Next.js SSG app (static site generation), so the documentation above will be invaluable. This is a custom build however, as Next's SSG does not work with any existing localization packages in the community. Thus, the following docs will help you get up and running with lozalization and SSG!  

## Table of contents
- [Adding page templates](#pages)  
  - [Folder structure](#folder-structure)
  - [Component setup](#component-setup)
- [Data and localization](#data-and-localization)  
  - [Configuring your locales](#configuring-your-locales)
  - [Locale string formats](#acceptable-locale-string-formats)
  - [Setting up localization data](#setting-up-localization-data)
  - [Localizing your pages](#localizing-your-pages)
- [Page template boilerplate](#page-boilerplate)
- [Styles (CSS)](#styles)  
- [Images and other assets](#images-and-assets)  
- [Environment variables](#environment-variables)
- [Hooks](#hooks)
- [Roadmap](#whats-next)

---

## Getting started:

Install dependencies:

```bash
npm install
```

Run a local development server at [http://localhost:8080](http://localhost:8080):

```bash
npm start
```

Build for production:

```bash
npm run build
```

---

## Pages
### Folder structure
Pages should be set up in the `src/pages/[locale]/` directory (The homepage is slight exception. Further details [below](#the-homepage-setup)). The `index.js` file inside the `[locale]` directory will output the root page of the project, while sub-directories of `[locale]` containing other `index.js` files will output sub-pages! ⚠️ Note that the pages directory will contain some other files as well — including its _own_ `index.js` file — do not delete those. Here's an example folder structure, containing a homepage, about page, and a contact page:
```
src/
├─ pages/
│  ├─ [locale]/
│  │  ├─ index.js
│  │  ├─ contact/
│  │  │  ├─ index.js
│  │  ├─ about/
│  │  │  ├─ index.js
│  ├─ index.js
│  ├─ _app.js
│  ├─ _document.js
```
### The homepage setup
As mentioned above all pages should be set up in the locales directory. However because we want to render the homepage in two places (the default locale renders in `src/pages/index.js` and `src/pages/[locales]/index.js`) we need to move the content of the homepage into a shareable component. This is setup by default as `src/components/home-page-contents/`. Any content, styles or logic for the homepage should be added to this component instead.

### Component setup
The only requirements for your page component to work properly are:
- Define the folder for the locales. For example `const LOCALE_FOLDER = "about"`
- Import `setupPaths` and `setupProps` from `src/utils/page-setup`
- Export the results of those function calls, as `getStaticPaths` and `getStaticProps`, respectively.
- Import `useLocale` from `hooks/use-locale`
- Add useLocale to the page component passing in `LOCALE_FOLDER`
- Import `PageProvider` from `src/context/page-context`
- Wrap all you components content in `<PageProvider page={LOCALE_FOLDER}>`
- Use the main component as the file's default export.

This will make more sense in the example [Page template boilerplate](#page-boilerplate) below.

---

## Data and localization
### Configuring your locales
To set up localized versions of your pages, you need to modify the `src/config-locales.js` file such that it exports the correct locale settings for your project. By default, that file looks like this:
```js
module.exports = {
  defaultLocale: "en"
}
```
### Acceptable locale string formats
Any of the following string formats are valid for the locale config and yaml filenames, and they're all case insensitive. Let's use the United States (English) as an example:
```
"en"
"en-us"
"en-US"
"en_us"
"en_US"
```
But be sure to stick to one format for your whole site.


### Setting up localization data
All global data and page-specific data which needs to be localized will live in the `src/locales/` directory. All locale data must be in YAML format (`.yml` or `.yaml`).

Data is organized into "globals" (data which persists across pages — like your project footer, navigation items, etc.), and page-level information.  

With the exception of `globals`, you can name these folders whatever you like, but it is recommended you name them the same as the structure in your pages folder. 

Example locale data folder structure…
```
src/
├─ locales/
│  ├─ home/
│  │  ├─ en.yml
│  │  ├─ es.yml
│  │  ├─ fr.yml
│  ├─ about/
│  │  ├─ en.yml
│  │  ├─ es.yml
│  │  ├─ fr.yml
│  ├─ contact/
│  │  ├─ en.yml
│  │  ├─ es.yml
│  │  ├─ fr.yml
│  ├─ globals/
│  │  ├─ en.yml
│  │  ├─ es.yml
│  │  ├─ fr.yml
```
Pages are generated based on the locale files found in the corresponding folder. For example say your site has 2 sub pages, "about" and "contact". In `src/locales/about/` you have yaml files for `en`, `es` and `fr`. In `src/locales/contact/` you only have a `fr` yaml file. In this scenario your built site would look like this:
```

/
/en/about/

/fr/
/fr/about/
/fr/contact/

/es/
/es/about/

```

⚠️ Note: the site's root will also be generated for your default locale (`/en/`, for example), but it will be empty and redirect to `/`. This allows you to have simpler, sharable URLs for your default language.  

### Localizing your pages
To get the correct localization for your page you need to pass in the folder name that has the corresponding locales. You do this in a few places. First in the `useLocales`, then in the `PageProvider`, in the `setupPaths` funtion, and finally in the `setupProps` funtion. For example if you are on the homepage and have saved your yml files in `src/locales/home/*.yml` you would use

```jsx
const LOCALES_FOLDER = "home"

const Page = () => {
  const { page } = useLocale(LOCALE_FOLDER)

  return (
    <PageProvider page={LOCALE_FOLDER}>
    {/* ... */}
    </PageProvider>
  )
}

export const getStaticPaths = () => setupPaths(LOCALES_FOLDER)
export const getStaticProps = async (ctx) => setupProps(ctx, LOCALE_FOLDER)
```

or say you have your locales in `src/locales/news/article-1/*.yml` you would use

```jsx
const LOCALE_FOLDER = "news/article-1"

const Page = () => {
  const { page } = useLocale(LOCALE_FOLDER)

  return (
    <PageProvider page={LOCALE_FOLDER}>
    {/* ... */}
    </PageProvider>
  )
}

export const getStaticPaths = () => setupPaths(LOCALE_FOLDER)
export const getStaticProps = async (ctx) => setupProps(ctx, LOCALE_FOLDER)
```

See the [page boilerplate](#page-boilerplate), for a minimal example of a Page's full `index.js` file.

Locale infomation is available to the page and its components from the [`useLocale` hook](#useLocale) as `page` and `globals`. You can also get the current locale value with `locale`. 

### Why do we need to pass `LOCALE_FOLDER` in so many places?

If the site includes page transitions then there is a scenario where 2 pages can be loaded at once. If we rely on only pageProps to provide locale context then the outgoing page will temporarly have the locales of the new incoming page. To get around this we instead store both page locales in the locales context then use `LOCALE_FOLDER` to grab the correct one on each page.

A side effect of this is that during a page transistion any elements outside the page (for example a site wide header) will receive updated locales as soon as the page transition starts. But the page level components and any components loaded inside a the page context will keep it's relevant locales.

---

## Page boilerplate
The following is a stripped-down setup for a page file in `src/pages/[locale]/**/index.js`.  
⚠️ Note that `import` paths will vary depending on how deeply-nested your page is.

```jsx
import { setupPaths, setupProps } from "../../utils/page-setup"
import useLocale from "../../hooks/use-locale"
import PageProvider from "../../context/page-context"

const LOCALES_FOLDER = "contact";

const Contact = ({ pageName }) => {
  const { locale, globals, page } = useLocale(LOCALE_FOLDER)

  return (
    <PageProvider page={LOCALE_FOLDER}>
      <h1>{page.title}</h1>
      <p>{page.paragraph}</p>
    </PageProvider>
  )
}

export const getStaticPaths = () => setupPaths(LOCALES_FOLDER)
export const getStaticProps = async (ctx) => setupProps(ctx, LOCALES_FOLDER)

export default Contact
```

---

## Styles
This project can handle `.css` or `.scss` files.

### Global styles, helpers, and utility classes
**Global styles**, SASS **mixins**, SASS **functions**, and **utility classes** can all be found in the `src/styles/` directory.

### Component styles
Component level styles use [CSS Modules](https://github.com/css-modules/css-modules), which are scoped to the component by default. Thus, naming methodologies like BEM are irrelevant here 😏. Here is a quick example of how you might style a `Navigation` component using this technique:
```scss
/* src/components/nav/nav.module.scss */

.nav {
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
}

.list {
  display: flex;
  place-content: center;
}

.item {
  padding: 24px;
}
```
```jsx
/* src/components/nav/nav.js */

import { nav, list, item } from "./nav.module.scss"

export default function Nav() {
  // component logic omitted for brevity 

  return (
    <nav className={nav} aria-label={globals.nav.title}>
      <ul className={list}>
        {globals.nav.items.map((item, i) => (
          <li className={item} key={`nav-item-${i}`}>
            {item.label}
          </li>
        ))}
      </ul>
    </nav>
  )
}
```

💡 You can also import styles in bulk, via:
```jsx
import * as styles from "./nav.module.scss"
```
…and then reference them from the `styles` object:
```html
<nav className={styles.nav}>
  ...
</nav>
```

---

## Images, videos, and other assets
Videos, fonts, some images (like svgs), and any other public assets should live in the `/public/` directory.

### Images / Masher
When you run `npm run start` or `npm run build` it will also run the Masher tasks. This will watch for any images in the `./src/images/` folder and automatically process them in one of two ways: 

#### Defined
Images in the `.src/images/defined/` folder will be compressed, create alternative versions (for example png files will also generated webp version) and create 1x size (if -2x exists in the orginal filename). These versions will be created in the `./public/_images/` folder. It also adds information to the image registry (`./image_registry.json`) that allows the `<Picture>` component know breakpoints and file types.
#### Auto
Images in the `.src/images/auto/` folder will be compressed, create alternative versions (for example png files will also generated webp version) and create multipile versions at 300px width intervals. These versions will be created in the `./public/_images/` folder. It also adds information to the image registry (`./image_registry.json`) that allows the `<Img>` component know about the width, height and file types. 


### The `<Picture />` component
A helpful tool for creating responsive images (using `<picture>` and `<source>`) that are respectful of a user's device resolution (using `srcset`).  This component works particularly well with `defined` images processed by the masher.

Example usage below when used with an images processed by the masher. This will output 1x and 2x images for the small (default), medium-up, and large-up breakpoints:
```html
<Image
  src="/_demos/image.png"
  alt="Cartoon Avatar"
/>
```

Example usage below, not using masher. This will output 1x and 2x images for the small (default), medium-up, and large-up breakpoints:
```html
<Image
  src="/images/space-cowboy.jpg"
  alt="An American cowboy wearing an astronaut's helmet, holding a chrome
       rocket, and creepily looking into the distance."
  className="hero-art"
  lazy={true}
  breakpoints={["medium-up", "large-up"]}
/>
```
💡 For more information, check out the docs in the component file: `src/components/picture`.  
⚠️ If you don't need srcset or breakpoint-specific images, consider using a standard HTML `<img />` tag (for SVG sources as an example).

### The `<Img />` component
This component is still a work in progress. More information to come.

---

## Environment variables
Next JS has support for three environments: `local`, `development`, and `production`, and since we're using SSG, we can whittle that down to just `local` and `production` environments.  

You'll find `.env` files in your project's root, which are useful for defining build variables. If you want to expose variables to the browser, you must prefix them with `NEXT_PUBLIC_`.  

You can then access them in your components via `process.env.NEXT_PUBLIC_SITE_NAME`, for example.

More info on environment variables can be found in the [Next.js docs](https://nextjs.org/docs/basic-features/environment-variables)

---

## Hooks

### useLocale
Location: `src/hooks/use-locale.js`  
Provides access to global YAML data, page-level YAML data, and more. On pages the LOCALE_FOLDER must be passed in, however in components it should be omitted.

Example inside a page component

```js
import useLocale from "../../hooks/use-locale"

const LOCALE_FOLDER = "home"

const Page = () => {
  const { globals, page, locale, localeMap, alternativeLocales } = useLocale(LOCALE_FOLDER)

  // console.log(globals)   => your global data for the locale
  // console.log(page)      => your page data for the locale
  // console.log(locale)    => the current locale string, per your config
  // console.log(localeMap) => if exist it returns the mapped object, per your config
  // console.log(alternativeLocales) => an array of alternative locales for the current page

  ...
```

Example inside a component

```js
import useLocale from "../../hooks/use-locale"

const MyComponent = () => {
  // note that no locale folder string is passed in, in this case the page context will provide the correct locales
  const { globals, page, locale, localeMap, alternativeLocales } = useLocale()

  ...
```

### useUserPrefs
Location: `src/hooks/use-user-prefs.js`  
Provides access to the user's preferences, specifically for accessibility-related concerns.
```js
import useUserPrefs from "../../hooks/use-user-prefs"

const {
  prefersDarkColorScheme,
  togglePrefersDarkColorScheme,
  prefersReducedData,
  togglePrefersReducedData,
  prefersReducedMotion,
  togglePrefersReducedMotion,
} = useUserPrefs()
```

---

## What's next?
- Automated `sitemap.xml` generation
- Automated `link`/`hreflang` tags in the `<head>` for localized builds (see https://developers.google.com/search/docs/advanced/crawling/localized-versions)