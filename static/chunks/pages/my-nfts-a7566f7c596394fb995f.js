(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[803],{40656:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return v}});var a=t(80318),s=t(9008),c=t(88279),l=t(37627),r=t(71902),i=t(92394),o=t(30266),x=t(809),u=t.n(x),f=t(67294),d=t(19496),p=t(10495),h=new d.rV.Connection("https://explorer-api.mainnet-beta.solana.com"),m=function(){var e=(0,l.Os)(),n=(0,f.useState)(!1),t=n[0],a=n[1],s=(0,f.useState)([]),c=s[0],r=s[1];return(0,f.useEffect)((function(){(0,o.Z)(u().mark((function n(){var t;return u().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(e&&e.publicKey&&e.signAllTransactions&&e.signTransaction){n.next=2;break}return n.abrupt("return");case 2:return a(!0),n.next=5,(0,p.zU)(h,e.publicKey);case 5:t=n.sent,r(t),a(!1);case 8:case"end":return n.stop()}}),n)})))()}),[e]),[t,c]},j=t(51436),N=t(17625),b=t(85893),v=function(){var e=(0,l.Os)(),n=m(),t=(0,a.Z)(n,2),o=t[0],x=t[1];return(0,b.jsxs)("div",{className:"flex flex-col justify-between h-full",children:[(0,b.jsxs)("main",{className:"p-5",children:[(0,b.jsx)(c.x7,{}),(0,b.jsxs)(s.default,{children:[(0,b.jsx)("title",{children:"Solana Candy Factory - My NFTs"}),(0,b.jsx)("meta",{name:"description",content:"Solana blockchain candy machine app boilerplate on top of Metaplex Candy Machine. NextJS, Tailwind, Anchor, SolanaLabs.React, dev/mainnet automation scripts."}),(0,b.jsx)("link",{rel:"icon",href:"/favicon.ico"})]}),(0,b.jsx)(r.Z,{}),(0,b.jsxs)("div",{className:"flex flex-col justify-center items-center flex-1 space-y-10 mt-20 divide-y-4 divide-purple-400",children:[o&&(0,b.jsx)("h1",{className:"text-lg text-black font-bold animate-pulse",children:"Loading your NFT's, please wait..."}),!o&&!e.connected&&(0,b.jsx)("h1",{className:"text-lg text-black font-bold",children:"Please connect your wallet."}),!o&&e.connected&&0===x.length&&(0,b.jsx)("h1",{className:"text-lg text-black font-bold",children:'You do not have "NFTs"'}),x.map((function(e){return(0,b.jsxs)("div",{className:"flex pt-10 flex-col items-center \r justify-center text-gray-800 font-bold uppercase space-y-5",children:[(0,b.jsx)("div",{className:"frame flex-grow-0",style:{padding:5},children:(0,b.jsx)("img",{src:e.image,alt:"NFT"})}),(0,b.jsx)("div",{className:"flex flex-col text-xl space-x-3 items-center",children:(0,b.jsxs)("a",{target:"_blank",href:"".concat(e.external_url,"/").concat(e.id),className:"flex space-x-3 text-black hover:text-purple-500",rel:"noreferrer",children:[(0,b.jsx)("span",{children:e.name}),(0,b.jsx)(N.G,{icon:j.Xjp,className:"w-4"})]})})]},e.name)}))]})]}),(0,b.jsx)(i.Z,{})]})}},66931:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/my-nfts",function(){return t(40656)}])}},function(e){e.O(0,[9774,4870,8523,414,9669,7625,5199,2888,179],(function(){return n=66931,e(e.s=n);var n}));var n=e.O();_N_E=n}]);