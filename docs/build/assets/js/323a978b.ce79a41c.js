"use strict";(self.webpackChunk_corgi_docs=self.webpackChunk_corgi_docs||[]).push([[806],{5318:(e,t,n)=>{n.d(t,{Zo:()=>l,kt:()=>m});var r=n(7378);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var c=r.createContext({}),p=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},l=function(e){var t=p(e.components);return r.createElement(c.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},u=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,c=e.parentName,l=s(e,["components","mdxType","originalType","parentName"]),u=p(n),m=o,h=u["".concat(c,".").concat(m)]||u[m]||d[m]||a;return n?r.createElement(h,i(i({ref:t},l),{},{components:n})):r.createElement(h,i({ref:t},l))}));function m(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,i=new Array(a);i[0]=u;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s.mdxType="string"==typeof e?e:o,i[1]=s;for(var p=2;p<a;p++)i[p]=n[p];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}u.displayName="MDXCreateElement"},695:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>d,frontMatter:()=>a,metadata:()=>s,toc:()=>p});var r=n(5773),o=(n(7378),n(5318));const a={sidebar_position:1,description:"How to set up dynamic, locale-based routing."},i="Directory Structure",s={unversionedId:"pages/directory-structure",id:"pages/directory-structure",title:"Directory Structure",description:"How to set up dynamic, locale-based routing.",source:"@site/docs/pages/directory-structure.mdx",sourceDirName:"pages",slug:"/pages/directory-structure",permalink:"/docs/pages/directory-structure",draft:!1,tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1,description:"How to set up dynamic, locale-based routing."},sidebar:"tutorialSidebar",previous:{title:"Pages",permalink:"/docs/category/pages"},next:{title:"Page components",permalink:"/docs/pages/page-components"}},c={},p=[{value:"Dynamic locale-based routing",id:"dynamic-locale-based-routing",level:2},{value:"Other files in the <code>pages</code> directory",id:"other-files-in-the-pages-directory",level:2},{value:"<code>/src/pages/index.js</code>",id:"srcpagesindexjs",level:3},{value:"<code>_app_.js</code>, <code>_document.js</code>",id:"_app_js-_documentjs",level:3},{value:"<code>404.js</code>, <code>500.js</code>",id:"404js-500js",level:3}],l={toc:p};function d(e){let{components:t,...n}=e;return(0,o.kt)("wrapper",(0,r.Z)({},l,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"directory-structure"},"Directory Structure"),(0,o.kt)("h2",{id:"dynamic-locale-based-routing"},"Dynamic locale-based routing"),(0,o.kt)("p",null,"Next.js 12 uses page-based routing, meaning the structure of your ",(0,o.kt)("inlineCode",{parentName:"p"},"/src/pages/")," directory will directly determine the routes of your project. In Corgi, all pages must live one step deeper: within the ",(0,o.kt)("inlineCode",{parentName:"p"},"/src/pages/[locale]/")," directory."),(0,o.kt)("p",null,"The ",(0,o.kt)("inlineCode",{parentName:"p"},"[locale]")," directory acts as a ",(0,o.kt)("a",{parentName:"p",href:"https://nextjs.org/docs/routing/dynamic-routes"},"dynamic route"),", which\u2014when compiled\u2014results in the appropriate locale string being slotted into the URL."),(0,o.kt)("p",null,"Here is an example file tree for the pages directory in a Corgi project. We'll cover some of the other files shortly; let's only concern ourselves with the ",(0,o.kt)("inlineCode",{parentName:"p"},"[locale]")," directory for now:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},".\n\u2514\u2500\u2500 src/\n    \u2514\u2500\u2500 pages/\n        \u251c\u2500\u2500 [locale]/\n        \u2502   \u251c\u2500\u2500 index.js\n        \u2502   \u251c\u2500\u2500 about/\n        \u2502   \u2502   \u2514\u2500\u2500 index.js\n        \u2502   \u2514\u2500\u2500 contact/\n        \u2502       \u2514\u2500\u2500 index.js\n        \u251c\u2500\u2500 _app.js\n        \u251c\u2500\u2500 _document.js\n        \u251c\u2500\u2500 404.js\n        \u251c\u2500\u2500 500.js\n        \u2514\u2500\u2500 index.js\n")),(0,o.kt)("p",null,"The directory structure above will result in the following routes, assuming ",(0,o.kt)("a",{parentName:"p",href:"../category/localization"},"locales"),' are defined for "en", "es", and "fr":'),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js",metastring:'title="Page routes"',title:'"Page','routes"':!0},"/\n/es\n/fr\n\n/en/about\n/es/about\n/fr/about\n\n/en/contact\n/es/contact\n/fr/contact\n")),(0,o.kt)("admonition",{title:"Default locale homepage URL",type:"info"},(0,o.kt)("p",{parentName:"admonition"},"Note that the root (homepage) of the default locale's URL does ",(0,o.kt)("em",{parentName:"p"},"not")," contain the locale string. This is an opinion enforced by Corgi, in an effort to have simpler URLs for the primary locele's landing page experience."),(0,o.kt)("p",{parentName:"admonition"},"In other words, Corgi makes it so that you don't have to share your website as ",(0,o.kt)("inlineCode",{parentName:"p"},"myproject.com/en")," if your default locale is ",(0,o.kt)("inlineCode",{parentName:"p"},'"en"'),". Rather, you can just share ",(0,o.kt)("inlineCode",{parentName:"p"},"myproject.com"))),(0,o.kt)("h2",{id:"other-files-in-the-pages-directory"},"Other files in the ",(0,o.kt)("inlineCode",{parentName:"h2"},"pages")," directory"),(0,o.kt)("h3",{id:"srcpagesindexjs"},(0,o.kt)("inlineCode",{parentName:"h3"},"/src/pages/index.js")),(0,o.kt)("p",null,"This is the root/homepage component, for the ",(0,o.kt)("strong",{parentName:"p"},"default")," locale only. It ensures that you can navigate to ",(0,o.kt)("inlineCode",{parentName:"p"},"/")," on your project, and see the default locale's content."),(0,o.kt)("admonition",{title:"Homepage content",type:"caution"},(0,o.kt)("p",{parentName:"admonition"},"All homepage ",(0,o.kt)("em",{parentName:"p"},"content")," must be edited in the ",(0,o.kt)("inlineCode",{parentName:"p"},"/src/components/home-page-contents")," component, becuase this particular index page is not the only place the homepage content needs to live. A homepage index file must also live in the dynamic ","[locale]"," path (for localized pages, of course!) \u2014 thus the abstracted component for the homepage. More on this in the ",(0,o.kt)("a",{parentName:"p",href:"./page-components#homepage-specifics"},"page component")," section.")),(0,o.kt)("h3",{id:"_app_js-_documentjs"},(0,o.kt)("inlineCode",{parentName:"h3"},"_app_.js"),", ",(0,o.kt)("inlineCode",{parentName:"h3"},"_document.js")),(0,o.kt)("p",null,"These are no different than the typical custom Next.js 12 setup, and handle things like global context providers, the HTML ",(0,o.kt)("inlineCode",{parentName:"p"},"<head>")," element, ",(0,o.kt)("inlineCode",{parentName:"p"},"<body>")," tag, and so on. More info in the Next docs, for ",(0,o.kt)("a",{parentName:"p",href:"https://nextjs.org/docs/advanced-features/custom-app"},(0,o.kt)("inlineCode",{parentName:"a"},"_app.js"))," and ",(0,o.kt)("a",{parentName:"p",href:"https://nextjs.org/docs/advanced-features/custom-document"},(0,o.kt)("inlineCode",{parentName:"a"},"_document.js")),"."),(0,o.kt)("h3",{id:"404js-500js"},(0,o.kt)("inlineCode",{parentName:"h3"},"404.js"),", ",(0,o.kt)("inlineCode",{parentName:"h3"},"500.js")),(0,o.kt)("p",null,"These are resource-not-found and server-error files, which are required for Next.js builds. Since Corgi generates a static site, these files are not actually ",(0,o.kt)("em",{parentName:"p"},"used")," in a deployment build, but since Next.js requires them, we must keep them here."))}d.isMDXComponent=!0}}]);