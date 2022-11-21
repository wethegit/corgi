"use strict";(self.webpackChunk_corgi_docs=self.webpackChunk_corgi_docs||[]).push([[683],{5318:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>m});var a=n(7378);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=a.createContext({}),p=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},d=function(e){var t=p(e.components);return a.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},c=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,s=e.parentName,d=l(e,["components","mdxType","originalType","parentName"]),c=p(n),m=r,g=c["".concat(s,".").concat(m)]||c[m]||u[m]||o;return n?a.createElement(g,i(i({ref:t},d),{},{components:n})):a.createElement(g,i({ref:t},d))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,i=new Array(o);i[0]=c;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:r,i[1]=l;for(var p=2;p<o;p++)i[p]=n[p];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}c.displayName="MDXCreateElement"},8074:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>u,frontMatter:()=>o,metadata:()=>l,toc:()=>p});var a=n(5773),r=(n(7378),n(5318));const o={description:"Provides a global settings context for the site."},i="useSiteState",l={unversionedId:"hooks/use-site-settings",id:"hooks/use-site-settings",title:"useSiteState",description:"Provides a global settings context for the site.",source:"@site/docs/hooks/use-site-settings.mdx",sourceDirName:"hooks",slug:"/hooks/use-site-settings",permalink:"/docs/hooks/use-site-settings",draft:!1,tags:[],version:"current",frontMatter:{description:"Provides a global settings context for the site."},sidebar:"tutorialSidebar",previous:{title:"usePreventScroll",permalink:"/docs/hooks/use-prevent-scroll"},next:{title:"useUserPrefs",permalink:"/docs/hooks/use-user-prefs"}},s={},p=[{value:"Return value",id:"return-value",level:2},{value:"Usage",id:"usage",level:2}],d={toc:p};function u(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,a.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"usesitestate"},(0,r.kt)("inlineCode",{parentName:"h1"},"useSiteState")),(0,r.kt)("p",null,"Location: ",(0,r.kt)("inlineCode",{parentName:"p"},"/src/hooks/use-site-state.js")),(0,r.kt)("p",null,"The ",(0,r.kt)("inlineCode",{parentName:"p"},"useSiteState")," hook provides a generic, global settings context for the site. Many of its properties and methods returned by default are necessary for various pieces of Corgi page management logic. However, it's an extremely open-ended hook, so in addition to these properties and methods, you are encouraged to add your own global/site-wide state if needed."),(0,r.kt)("admonition",{title:"Overuse of React Context",type:"danger"},(0,r.kt)("p",{parentName:"admonition"},"Any change of state within a Context Provider ",(0,r.kt)("em",{parentName:"p"},"will")," cause a re-render of all of its children. Only use this hook if you're absolutely sure that the state needs to managed at the app-level.")),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"useSiteState()")),(0,r.kt)("h2",{id:"return-value"},"Return value"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"useSiteState")," returns an object containing the following properties:"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Property"),(0,r.kt)("th",{parentName:"tr",align:null},"Type"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"modalOpen"),(0,r.kt)("td",{parentName:"tr",align:null},"Boolean"),(0,r.kt)("td",{parentName:"tr",align:null},"A flag for the ",(0,r.kt)("em",{parentName:"td"},"full scope")," of your site, which tells all child components when a Modal window is open. Note that Corgi does not provide a modal component out of the box.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"setModalOpen"),(0,r.kt)("td",{parentName:"tr",align:null},"Function"),(0,r.kt)("td",{parentName:"tr",align:null},"An updater function for the ",(0,r.kt)("inlineCode",{parentName:"td"},"modalOpen"),' state. It can be useful to call this function along with your modal open/close implementation, passing in whatever the "open" state is.')),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"background"),(0,r.kt)("td",{parentName:"tr",align:null},"String"),(0,r.kt)("td",{parentName:"tr",align:null},"A generic value that can be used to set an element's background from much deeper in the DOM.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"setBackground"),(0,r.kt)("td",{parentName:"tr",align:null},"Function"),(0,r.kt)("td",{parentName:"tr",align:null},"An updater function for the ",(0,r.kt)("inlineCode",{parentName:"td"},"background")," state.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"pageHistory"),(0,r.kt)("td",{parentName:"tr",align:null},"Array"),(0,r.kt)("td",{parentName:"tr",align:null},"A reverse-chronological list of page directory names that have been visited, for use under the hood in the ",(0,r.kt)("inlineCode",{parentName:"td"},"useLocale")," hook.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"addPage"),(0,r.kt)("td",{parentName:"tr",align:null},"Function"),(0,r.kt)("td",{parentName:"tr",align:null},"Adds the provided value to the beginning of the ",(0,r.kt)("inlineCode",{parentName:"td"},"pageHistory")," array.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"transitionState"),(0,r.kt)("td",{parentName:"tr",align:null},"String"),(0,r.kt)("td",{parentName:"tr",align:null},"The current Page Transition state. One of: ",(0,r.kt)("inlineCode",{parentName:"td"},'"ready"'),", ",(0,r.kt)("inlineCode",{parentName:"td"},'"out"'),", ",(0,r.kt)("inlineCode",{parentName:"td"},'"in"'),", or ",(0,r.kt)("inlineCode",{parentName:"td"},'"complete"'),".")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"transitionEvent"),(0,r.kt)("td",{parentName:"tr",align:null},"Function"),(0,r.kt)("td",{parentName:"tr",align:null},"Dispatches a Page Transition event, based on the provided value. One of: ",(0,r.kt)("inlineCode",{parentName:"td"},'"onExit"'),", ",(0,r.kt)("inlineCode",{parentName:"td"},'"onExiting"'),", ",(0,r.kt)("inlineCode",{parentName:"td"},'"onEntering"'),", ",(0,r.kt)("inlineCode",{parentName:"td"},'"onEntered"'),". See ",(0,r.kt)("a",{parentName:"td",href:"https://reactcommunity.org/react-transition-group/"},"React Transition Group")," for more information on this.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"version"),(0,r.kt)("td",{parentName:"tr",align:null},"String"),(0,r.kt)("td",{parentName:"tr",align:null},"The app version, as specified in ",(0,r.kt)("inlineCode",{parentName:"td"},"package.json"),".")))),(0,r.kt)("h2",{id:"usage"},"Usage"),(0,r.kt)("p",null,"The following is just an example of the many things you ",(0,r.kt)("em",{parentName:"p"},"could")," do with this hook \u2014 it's really quite open-ended. Here we're setting a property on the site state context, called ",(0,r.kt)("inlineCode",{parentName:"p"},"background"),", from within a component ",(0,r.kt)("inlineCode",{parentName:"p"},"<MyComponent>"),". In the next code block, we're using that ",(0,r.kt)("inlineCode",{parentName:"p"},"background")," value to manipulate a CSS custom property on the ",(0,r.kt)("inlineCode",{parentName:"p"},'<div id="main-content">')," element."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-jsx"},'import { useEffect } from "react"\nimport useSiteState from "../../hooks/use-site-state";\n\nconst MyComponent = () => {\n  const { setBackground } = useSiteState();\n\n  useEffect(() => {\n    // sets the background property of the siteState to "red", on mount.\n    setBackground("red")\n  }, [])\n\n  ...\n};\n')),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-jsx",metastring:"title=/src/containers/page.js",title:"/src/containers/page.js"},'import useSiteState from "../hooks/use-site-state";\n\nconst Page = ({ children, className, version }) => {\n  const { background } = useSiteState();\n\n  return (\n    <div\n      id="main-content"\n      className={styles.mainContent}\n      style={{ "--bg": background }}\n    >\n      {children}\n    </div>\n  );\n};\n\nexport default Page;\n')),(0,r.kt)("p",null,"The CSS module for the ",(0,r.kt)("inlineCode",{parentName:"p"},"<Page>")," component above might then look something like:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-scss",metastring:"title=/src/containers/page.module.scss",title:"/src/containers/page.module.scss"},".mainContent {\n  background: var(--bg);\n}\n")))}u.isMDXComponent=!0}}]);