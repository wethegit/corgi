"use strict";(self.webpackChunk_corgi_docs=self.webpackChunk_corgi_docs||[]).push([[75],{5318:(e,t,n)=>{n.d(t,{Zo:()=>l,kt:()=>d});var o=n(7378);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},a=Object.keys(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var c=o.createContext({}),p=function(e){var t=o.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},l=function(e){var t=p(e.components);return o.createElement(c.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},u=o.forwardRef((function(e,t){var n=e.components,r=e.mdxType,a=e.originalType,c=e.parentName,l=s(e,["components","mdxType","originalType","parentName"]),u=p(n),d=r,f=u["".concat(c,".").concat(d)]||u[d]||m[d]||a;return n?o.createElement(f,i(i({ref:t},l),{},{components:n})):o.createElement(f,i({ref:t},l))}));function d(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=n.length,i=new Array(a);i[0]=u;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s.mdxType="string"==typeof e?e:r,i[1]=s;for(var p=2;p<a;p++)i[p]=n[p];return o.createElement.apply(null,i)}return o.createElement.apply(null,n)}u.displayName="MDXCreateElement"},5002:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>m,frontMatter:()=>a,metadata:()=>s,toc:()=>p});var o=n(5773),r=(n(7378),n(5318));const a={title:"Static assets"},i="Other static assets",s={unversionedId:"images/static-assets",id:"images/static-assets",title:"Static assets",description:"If your assets do not call for any image optimization or breakpoint-specific versions (i.e. the `` component), then they fall into this category.",source:"@site/docs/images/static-assets.mdx",sourceDirName:"images",slug:"/images/static-assets",permalink:"/docs/images/static-assets",draft:!1,tags:[],version:"current",frontMatter:{title:"Static assets"},sidebar:"tutorialSidebar",previous:{title:"<Picture> component",permalink:"/docs/images/picture-component"},next:{title:"Hooks",permalink:"/docs/category/hooks"}},c={},p=[{value:"Examples",id:"examples",level:2}],l={toc:p};function m(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,o.Z)({},l,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"other-static-assets"},"Other static assets"),(0,r.kt)("p",null,"If your assets do not call for any ",(0,r.kt)("a",{parentName:"p",href:"./image-optimization"},"image optimization")," or breakpoint-specific versions (i.e. the ",(0,r.kt)("a",{parentName:"p",href:"./picture-component"},(0,r.kt)("inlineCode",{parentName:"a"},"<Picture>")," component"),"), then they fall into this category."),(0,r.kt)("p",null,"You can include any assets in the ",(0,r.kt)("inlineCode",{parentName:"p"},"/public/")," directory, to be served as static files from the compiled project's root. Do not tamper with the Corgi-generated ",(0,r.kt)("inlineCode",{parentName:"p"},"/public/_images/")," directory though, as that is reserved for images generated and optimized by Corgi."),(0,r.kt)("p",null,"Formats like ",(0,r.kt)("inlineCode",{parentName:"p"},".svg"),", ",(0,r.kt)("inlineCode",{parentName:"p"},".mp4"),", ",(0,r.kt)("inlineCode",{parentName:"p"},".mp3")," (and so on) are good candidates for the ",(0,r.kt)("inlineCode",{parentName:"p"},"/public/")," directory. There is no need to use any specific component to access these files\u2014just use the HTML-native ",(0,r.kt)("inlineCode",{parentName:"p"},"<img>"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"<video>"),", or ",(0,r.kt)("inlineCode",{parentName:"p"},"<audio>")," elements, respectively."),(0,r.kt)("admonition",{title:"non-optimized images",type:"info"},(0,r.kt)("p",{parentName:"admonition"},"You don't ",(0,r.kt)("em",{parentName:"p"},"have")," to buy-in to Corgi's image system if you prefer not to. Any file format be accessed from the public folder just as you'd expect, by referencing the file path from the project's root ",(0,r.kt)("inlineCode",{parentName:"p"},"/"),". For example, an image in ",(0,r.kt)("inlineCode",{parentName:"p"},"/public/images/logos/my-logo.png")," would be accessed via ",(0,r.kt)("inlineCode",{parentName:"p"},'<img src="/images/logos/my-logo.png" alt="" />'),".")),(0,r.kt)("h2",{id:"examples"},"Examples"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-jsx"},'const MyComponent = () => {\n  return (\n    <>\n      <img src="/images/logo.png" alt="Description of company logo." />\n\n      <img src="/images/diamond-icon.svg" alt="Diamond" />\n\n      <audio src="/audio/annoying-background-music.mp3" muted controls />\n\n      <video\n        src="/videos/header-background.mp4"\n        autoplay\n        playsinline\n        muted\n        loop\n        controls\n      />\n    </>\n  );\n};\n')))}m.isMDXComponent=!0}}]);