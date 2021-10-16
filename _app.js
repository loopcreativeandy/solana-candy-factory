"use strict";
(() => {
var exports = {};
exports.id = 888;
exports.ids = [888];
exports.modules = {

/***/ 9126:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ _app)
});

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(9297);
;// CONCATENATED MODULE: external "react-google-recaptcha-v3"
const external_react_google_recaptcha_v3_namespaceObject = require("react-google-recaptcha-v3");
// EXTERNAL MODULE: ./node_modules/@solana/wallet-adapter-react/lib/index.js + 7 modules
var lib = __webpack_require__(7627);
// EXTERNAL MODULE: ./node_modules/@solana/wallet-adapter-react-ui/lib/index.js + 11 modules
var wallet_adapter_react_ui_lib = __webpack_require__(4526);
// EXTERNAL MODULE: ./src/hooks/use-wallet-balance.tsx
var use_wallet_balance = __webpack_require__(3924);
// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(5282);
;// CONCATENATED MODULE: ./src/pages/_app.tsx
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




let WALLETS = {
  getPhantomWallet: () => ({
    name: 'Phantom'
  }),
  getSolflareWallet: () => ({
    name: 'Solflare'
  }),
  getSolletWallet: () => ({
    name: 'Sollet'
  }),
  getLedgerWallet: () => ({
    name: 'Ledger'
  }),
  getSlopeWallet: () => ({
    name: 'Slope'
  }),
  getSolletExtensionWallet: () => ({
    name: 'SolletExtension'
  })
};

if (false) {}






const network = "mainnet-beta";

const App = ({
  Component,
  pageProps
}) => {
  const endpoint = (0,external_react_.useMemo)(() => 'https://solana-api.projectserum.com', []);
  const wallets = (0,external_react_.useMemo)(() => [WALLETS.getPhantomWallet(), WALLETS.getSolflareWallet(), WALLETS.getSolletWallet({
    network
  }), WALLETS.getLedgerWallet(), WALLETS.getSlopeWallet(), WALLETS.getSolletExtensionWallet({
    network
  })], []);
  return /*#__PURE__*/jsx_runtime_.jsx(external_react_google_recaptcha_v3_namespaceObject.GoogleReCaptchaProvider, {
    reCaptchaKey: "redacted",
    scriptProps: {
      async: false,
      defer: false,
      appendTo: 'head',
      nonce: undefined
    },
    children: /*#__PURE__*/jsx_runtime_.jsx(lib/* ConnectionProvider */.U, {
      endpoint: endpoint,
      children: /*#__PURE__*/jsx_runtime_.jsx(lib/* WalletProvider */.nS, {
        wallets: wallets,
        autoConnect: true,
        children: /*#__PURE__*/jsx_runtime_.jsx(wallet_adapter_react_ui_lib/* WalletModalProvider */.sR, {
          children: /*#__PURE__*/jsx_runtime_.jsx(use_wallet_balance/* WalletBalanceProvider */.P, {
            children: /*#__PURE__*/jsx_runtime_.jsx(Component, _objectSpread({}, pageProps))
          })
        })
      })
    })
  });
};

/* harmony default export */ const _app = (App);

/***/ }),

/***/ 6391:
/***/ ((module) => {

module.exports = require("@project-serum/anchor");

/***/ }),

/***/ 5681:
/***/ ((module) => {

module.exports = require("@solana/web3.js");

/***/ }),

/***/ 9553:
/***/ ((module) => {

module.exports = require("eventemitter3");

/***/ }),

/***/ 9297:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 2268:
/***/ ((module) => {

module.exports = require("react-dom");

/***/ }),

/***/ 5282:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [526,924], () => (__webpack_exec__(9126)));
module.exports = __webpack_exports__;

})();