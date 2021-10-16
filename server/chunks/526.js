"use strict";
exports.id = 526;
exports.ids = [526];
exports.modules = {

/***/ 4637:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "lj": () => (/* reexport */ errors_WalletError),
  "oS": () => (/* reexport */ WalletNotConnectedError),
  "OZ": () => (/* reexport */ WalletNotReadyError)
});

// UNUSED EXPORTS: BaseMessageSignerWalletAdapter, BaseSignerWalletAdapter, BaseWalletAdapter, EventEmitter, WalletAccountError, WalletAdapterNetwork, WalletConnectionError, WalletDisconnectedError, WalletDisconnectionError, WalletKeypairError, WalletNotFoundError, WalletNotInstalledError, WalletPublicKeyError, WalletSendTransactionError, WalletSignMessageError, WalletSignTransactionError, WalletTimeoutError, WalletWindowBlockedError, WalletWindowClosedError, poll, pollUntilReady

// EXTERNAL MODULE: external "eventemitter3"
var external_eventemitter3_ = __webpack_require__(9553);
;// CONCATENATED MODULE: ./node_modules/@solana/wallet-adapter-base/lib/adapter.js


class adapter_BaseWalletAdapter extends (/* unused pure expression or super */ null && (EventEmitter)) {}
var WalletAdapterNetwork;

(function (WalletAdapterNetwork) {
  WalletAdapterNetwork["Mainnet"] = "mainnet-beta";
  WalletAdapterNetwork["Testnet"] = "testnet";
  WalletAdapterNetwork["Devnet"] = "devnet";
})(WalletAdapterNetwork || (WalletAdapterNetwork = {}));
;// CONCATENATED MODULE: ./node_modules/@solana/wallet-adapter-base/lib/errors.js
class errors_WalletError extends Error {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  constructor(message, error) {
    super(message);
    this.error = error;
  }

}
class WalletNotFoundError extends (/* unused pure expression or super */ null && (errors_WalletError)) {
  constructor() {
    super(...arguments);
    this.name = 'WalletNotFoundError';
  }

}
class WalletNotInstalledError extends (/* unused pure expression or super */ null && (errors_WalletError)) {
  constructor() {
    super(...arguments);
    this.name = 'WalletNotInstalledError';
  }

}
class WalletNotReadyError extends errors_WalletError {
  constructor() {
    super(...arguments);
    this.name = 'WalletNotReadyError';
  }

}
class WalletConnectionError extends (/* unused pure expression or super */ null && (errors_WalletError)) {
  constructor() {
    super(...arguments);
    this.name = 'WalletConnectionError';
  }

}
class WalletDisconnectedError extends (/* unused pure expression or super */ null && (errors_WalletError)) {
  constructor() {
    super(...arguments);
    this.name = 'WalletDisconnectedError';
  }

}
class WalletDisconnectionError extends (/* unused pure expression or super */ null && (errors_WalletError)) {
  constructor() {
    super(...arguments);
    this.name = 'WalletDisconnectionError';
  }

}
class WalletAccountError extends (/* unused pure expression or super */ null && (errors_WalletError)) {
  constructor() {
    super(...arguments);
    this.name = 'WalletAccountError';
  }

}
class WalletPublicKeyError extends (/* unused pure expression or super */ null && (errors_WalletError)) {
  constructor() {
    super(...arguments);
    this.name = 'WalletPublicKeyError';
  }

}
class WalletKeypairError extends (/* unused pure expression or super */ null && (errors_WalletError)) {
  constructor() {
    super(...arguments);
    this.name = 'WalletKeypairError';
  }

}
class WalletNotConnectedError extends errors_WalletError {
  constructor() {
    super(...arguments);
    this.name = 'WalletNotConnectedError';
  }

}
class errors_WalletSendTransactionError extends (/* unused pure expression or super */ null && (errors_WalletError)) {
  constructor() {
    super(...arguments);
    this.name = 'WalletSendTransactionError';
  }

}
class WalletSignMessageError extends (/* unused pure expression or super */ null && (errors_WalletError)) {
  constructor() {
    super(...arguments);
    this.name = 'WalletSignMessageError';
  }

}
class WalletSignTransactionError extends (/* unused pure expression or super */ null && (errors_WalletError)) {
  constructor() {
    super(...arguments);
    this.name = 'WalletSignTransactionError';
  }

}
class WalletTimeoutError extends (/* unused pure expression or super */ null && (errors_WalletError)) {
  constructor() {
    super(...arguments);
    this.name = 'WalletTimeoutError';
  }

}
class WalletWindowBlockedError extends (/* unused pure expression or super */ null && (errors_WalletError)) {
  constructor() {
    super(...arguments);
    this.name = 'WalletWindowBlockedError';
  }

}
class WalletWindowClosedError extends (/* unused pure expression or super */ null && (errors_WalletError)) {
  constructor() {
    super(...arguments);
    this.name = 'WalletWindowClosedError';
  }

}
;// CONCATENATED MODULE: ./node_modules/@solana/wallet-adapter-base/lib/poll.js
var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

function poll(callback, interval, count) {
  if (count > 0) {
    setTimeout(() => __awaiter(this, void 0, void 0, function* () {
      const done = yield callback();
      if (!done) poll(callback, interval, count - 1);
    }), interval);
  }
}
function pollUntilReady(adapter, pollInterval, pollCount) {
  poll(() => {
    const {
      ready
    } = adapter;

    if (ready) {
      if (!adapter.emit('ready')) {
        console.warn(`${adapter.constructor.name} is ready but no listener was registered`);
      }
    }

    return ready;
  }, pollInterval, pollCount);
}
;// CONCATENATED MODULE: ./node_modules/@solana/wallet-adapter-base/lib/signer.js
var signer_awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __rest = undefined && undefined.__rest || function (s, e) {
  var t = {};

  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};



class BaseSignerWalletAdapter extends (/* unused pure expression or super */ null && (BaseWalletAdapter)) {
  sendTransaction(transaction, connection, options = {}) {
    return signer_awaiter(this, void 0, void 0, function* () {
      try {
        try {
          transaction.feePayer || (transaction.feePayer = this.publicKey || undefined);
          transaction.recentBlockhash || (transaction.recentBlockhash = (yield connection.getRecentBlockhash('finalized')).blockhash);

          const {
            signers
          } = options,
                sendOptions = __rest(options, ["signers"]);

          (signers === null || signers === void 0 ? void 0 : signers.length) && transaction.partialSign(...signers);
          transaction = yield this.signTransaction(transaction);
          const rawTransaction = transaction.serialize();
          return yield connection.sendRawTransaction(rawTransaction, sendOptions);
        } catch (error) {
          if (error instanceof WalletError) throw error;
          throw new WalletSendTransactionError(error === null || error === void 0 ? void 0 : error.message, error);
        }
      } catch (error) {
        this.emit('error', error);
        throw error;
      }
    });
  }

}
class BaseMessageSignerWalletAdapter extends (/* unused pure expression or super */ null && (BaseSignerWalletAdapter)) {}
;// CONCATENATED MODULE: ./node_modules/@solana/wallet-adapter-base/lib/index.js





/***/ }),

/***/ 4526:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "vg": () => (/* reexport */ WalletDisconnectButton),
  "sR": () => (/* reexport */ WalletModalProvider),
  "aD": () => (/* reexport */ WalletMultiButton)
});

// UNUSED EXPORTS: WalletConnectButton, WalletIcon, WalletModal, WalletModalButton, WalletModalContext, useWalletModal

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(9297);
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);
;// CONCATENATED MODULE: ./node_modules/@solana/wallet-adapter-react-ui/lib/useWalletModal.js

const WalletModalContext = /*#__PURE__*/(0,external_react_.createContext)({});
function useWalletModal() {
  return (0,external_react_.useContext)(WalletModalContext);
}
// EXTERNAL MODULE: ./node_modules/@solana/wallet-adapter-react/lib/index.js + 7 modules
var lib = __webpack_require__(7627);
;// CONCATENATED MODULE: ./node_modules/@solana/wallet-adapter-react-ui/lib/Button.js

const Button = props => {
  const justifyContent = props.endIcon || props.startIcon ? 'space-between' : 'center';
  return /*#__PURE__*/external_react_default().createElement("button", {
    className: `wallet-adapter-button ${props.className || ''}`,
    disabled: props.disabled,
    onClick: props.onClick,
    style: Object.assign({
      justifyContent
    }, props.style),
    tabIndex: props.tabIndex || 0
  }, props.startIcon && /*#__PURE__*/external_react_default().createElement("i", {
    className: "wallet-adapter-button-start-icon"
  }, props.startIcon), props.children, props.endIcon && /*#__PURE__*/external_react_default().createElement("i", {
    className: "wallet-adapter-button-end-icon"
  }, props.endIcon));
};
;// CONCATENATED MODULE: ./node_modules/@solana/wallet-adapter-react-ui/lib/WalletIcon.js
var __rest = undefined && undefined.__rest || function (s, e) {
  var t = {};

  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};


const WalletIcon = _a => {
  var {
    wallet
  } = _a,
      props = __rest(_a, ["wallet"]);

  return wallet && /*#__PURE__*/external_react_default().createElement("img", Object.assign({
    src: wallet.icon,
    alt: `${wallet.name} icon`
  }, props));
};
;// CONCATENATED MODULE: ./node_modules/@solana/wallet-adapter-react-ui/lib/WalletConnectButton.js
var WalletConnectButton_rest = undefined && undefined.__rest || function (s, e) {
  var t = {};

  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};





const WalletConnectButton = _a => {
  var {
    children,
    disabled,
    onClick
  } = _a,
      props = WalletConnectButton_rest(_a, ["children", "disabled", "onClick"]);

  const {
    wallet,
    connect,
    connecting,
    connected
  } = (0,lib/* useWallet */.Os)();
  const handleClick = (0,external_react_.useCallback)(event => {
    if (onClick) onClick(event); // eslint-disable-next-line @typescript-eslint/no-empty-function

    if (!event.defaultPrevented) connect().catch(() => {});
  }, [onClick, connect]);
  const content = (0,external_react_.useMemo)(() => {
    if (children) return children;
    if (connecting) return 'Connecting ...';
    if (connected) return 'Connected';
    if (wallet) return 'Connect';
    return 'Connect Wallet';
  }, [children, connecting, connected, wallet]);
  return /*#__PURE__*/external_react_default().createElement(Button, Object.assign({
    className: "wallet-adapter-button-trigger",
    disabled: disabled || !wallet || connecting || connected,
    startIcon: wallet ? /*#__PURE__*/external_react_default().createElement(WalletIcon, {
      wallet: wallet
    }) : undefined,
    onClick: handleClick
  }, props), content);
};
// EXTERNAL MODULE: external "react-dom"
var external_react_dom_ = __webpack_require__(2268);
;// CONCATENATED MODULE: ./node_modules/@solana/wallet-adapter-react-ui/lib/Collapse.js

const Collapse = ({
  id,
  children,
  expanded = false
}) => {
  const ref = (0,external_react_.useRef)(null);
  const instant = (0,external_react_.useRef)(true);
  const transition = 'height 250ms ease-out';

  const openCollapse = () => {
    const node = ref.current;
    if (!node) return;
    requestAnimationFrame(() => {
      node.style.height = node.scrollHeight + 'px';
    });
  };

  const closeCollapse = () => {
    const node = ref.current;
    if (!node) return;
    requestAnimationFrame(() => {
      node.style.height = node.offsetHeight + 'px';
      node.style.overflow = 'hidden';
      requestAnimationFrame(() => {
        node.style.height = '0';
      });
    });
  };

  (0,external_react_.useLayoutEffect)(() => {
    if (expanded) {
      openCollapse();
    } else {
      closeCollapse();
    }
  }, [expanded]);
  (0,external_react_.useLayoutEffect)(() => {
    const node = ref.current;
    if (!node) return;

    function handleComplete() {
      if (!node) return;
      node.style.overflow = expanded ? 'initial' : 'hidden';

      if (expanded) {
        node.style.height = 'auto';
      }
    }

    function handleTransitionEnd(event) {
      if (node && event.target === node && event.propertyName === 'height') {
        handleComplete();
      }
    }

    if (instant.current) {
      handleComplete();
      instant.current = false;
    }

    node.addEventListener('transitionend', handleTransitionEnd);
    return () => node.removeEventListener('transitionend', handleTransitionEnd);
  }, [expanded]);
  return /*#__PURE__*/external_react_default().createElement("div", {
    children: children,
    className: "wallet-adapter-collapse",
    id: id,
    ref: ref,
    role: "region",
    style: {
      height: 0,
      transition: instant.current ? undefined : transition
    }
  });
};
;// CONCATENATED MODULE: ./node_modules/@solana/wallet-adapter-react-ui/lib/WalletListItem.js



const WalletListItem = ({
  handleClick,
  tabIndex,
  wallet
}) => {
  return /*#__PURE__*/external_react_default().createElement("li", null, /*#__PURE__*/external_react_default().createElement(Button, {
    onClick: handleClick,
    endIcon: /*#__PURE__*/external_react_default().createElement(WalletIcon, {
      wallet: wallet
    }),
    tabIndex: tabIndex
  }, wallet.name));
};
;// CONCATENATED MODULE: ./node_modules/@solana/wallet-adapter-react-ui/lib/WalletModal.js







const WalletModal = ({
  className = '',
  logo,
  featuredWallets = 3,
  container = 'body'
}) => {
  const ref = (0,external_react_.useRef)(null);
  const {
    wallets,
    select
  } = (0,lib/* useWallet */.Os)();
  const {
    setVisible
  } = useWalletModal();
  const {
    0: expanded,
    1: setExpanded
  } = (0,external_react_.useState)(false);
  const {
    0: fadeIn,
    1: setFadeIn
  } = (0,external_react_.useState)(false);
  const {
    0: portal,
    1: setPortal
  } = (0,external_react_.useState)(null);
  const {
    0: featured,
    1: more
  } = (0,external_react_.useMemo)(() => [wallets.slice(0, featuredWallets), wallets.slice(featuredWallets)], [wallets, featuredWallets]);
  const hideModal = (0,external_react_.useCallback)(() => {
    setFadeIn(false);
    setTimeout(() => setVisible(false), 150);
  }, [setFadeIn, setVisible]);
  const handleClose = (0,external_react_.useCallback)(event => {
    event.preventDefault();
    hideModal();
  }, [hideModal]);
  const handleWalletClick = (0,external_react_.useCallback)((event, walletName) => {
    select(walletName);
    handleClose(event);
  }, [select, handleClose]);
  const handleCollapseClick = (0,external_react_.useCallback)(() => setExpanded(!expanded), [setExpanded, expanded]);
  const handleTabKey = (0,external_react_.useCallback)(event => {
    const node = ref.current;
    if (!node) return; // here we query all focusable elements

    const focusableElements = node.querySelectorAll('button');
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey) {
      // if going backward by pressing tab and firstElement is active, shift focus to last focusable element
      if (document.activeElement === firstElement) {
        lastElement.focus();
        event.preventDefault();
      }
    } else {
      // if going forward by pressing tab and lastElement is active, shift focus to first focusable element
      if (document.activeElement === lastElement) {
        firstElement.focus();
        event.preventDefault();
      }
    }
  }, [ref]);
  (0,external_react_.useLayoutEffect)(() => {
    const handleKeyDown = event => {
      if (event.key === 'Escape') {
        hideModal();
      } else if (event.key === 'Tab') {
        handleTabKey(event);
      }
    }; // Get original overflow


    const {
      overflow
    } = window.getComputedStyle(document.body); // Hack to enable fade in animation after mount

    setTimeout(() => setFadeIn(true), 0); // Prevent scrolling on mount

    document.body.style.overflow = 'hidden'; // Listen for keydown events

    window.addEventListener('keydown', handleKeyDown, false);
    return () => {
      // Re-enable scrolling when component unmounts
      document.body.style.overflow = overflow;
      window.removeEventListener('keydown', handleKeyDown, false);
    };
  }, [hideModal, handleTabKey]);
  (0,external_react_.useLayoutEffect)(() => setPortal(document.querySelector(container)), [setPortal, container]);
  return portal && /*#__PURE__*/(0,external_react_dom_.createPortal)( /*#__PURE__*/external_react_default().createElement("div", {
    "aria-labelledby": "wallet-adapter-modal-title",
    "aria-modal": "true",
    className: `wallet-adapter-modal ${fadeIn && 'wallet-adapter-modal-fade-in'} ${className}`,
    ref: ref,
    role: "dialog"
  }, /*#__PURE__*/external_react_default().createElement("div", {
    className: "wallet-adapter-modal-container"
  }, /*#__PURE__*/external_react_default().createElement("div", {
    className: `wallet-adapter-modal-wrapper ${!logo && 'wallet-adapter-modal-wrapper-no-logo'}`
  }, logo && /*#__PURE__*/external_react_default().createElement("div", {
    className: "wallet-adapter-modal-logo-wrapper"
  }, typeof logo === 'string' ? /*#__PURE__*/external_react_default().createElement("img", {
    alt: "logo",
    className: "wallet-adapter-modal-logo",
    src: logo
  }) : logo), /*#__PURE__*/external_react_default().createElement("h1", {
    className: "wallet-adapter-modal-title",
    id: "wallet-adapter-modal-title"
  }, "Connect Wallet"), /*#__PURE__*/external_react_default().createElement("button", {
    onClick: handleClose,
    className: "wallet-adapter-modal-button-close"
  }, /*#__PURE__*/external_react_default().createElement("svg", {
    width: "14",
    height: "14"
  }, /*#__PURE__*/external_react_default().createElement("path", {
    d: "M14 12.461 8.3 6.772l5.234-5.233L12.006 0 6.772 5.234 1.54 0 0 1.539l5.234 5.233L0 12.006l1.539 1.528L6.772 8.3l5.69 5.7L14 12.461z"
  }))), /*#__PURE__*/external_react_default().createElement("ul", {
    className: "wallet-adapter-modal-list"
  }, featured.map(wallet => /*#__PURE__*/external_react_default().createElement(WalletListItem, {
    key: wallet.name,
    handleClick: event => handleWalletClick(event, wallet.name),
    wallet: wallet
  }))), more.length ? /*#__PURE__*/external_react_default().createElement((external_react_default()).Fragment, null, /*#__PURE__*/external_react_default().createElement(Collapse, {
    expanded: expanded,
    id: "wallet-adapter-modal-collapse"
  }, /*#__PURE__*/external_react_default().createElement("ul", {
    className: "wallet-adapter-modal-list"
  }, more.map(wallet => /*#__PURE__*/external_react_default().createElement(WalletListItem, {
    key: wallet.name,
    handleClick: event => handleWalletClick(event, wallet.name),
    tabIndex: expanded ? 0 : -1,
    wallet: wallet
  })))), /*#__PURE__*/external_react_default().createElement(Button, {
    "aria-controls": "wallet-adapter-modal-collapse",
    "aria-expanded": expanded,
    className: `wallet-adapter-modal-collapse-button ${expanded && 'wallet-adapter-modal-collapse-button-active'}`,
    endIcon: /*#__PURE__*/external_react_default().createElement("svg", {
      width: "11",
      height: "6",
      xmlns: "http://www.w3.org/2000/svg"
    }, /*#__PURE__*/external_react_default().createElement("path", {
      d: "m5.938 5.73 4.28-4.126a.915.915 0 0 0 0-1.322 1 1 0 0 0-1.371 0L5.253 3.736 1.659.272a1 1 0 0 0-1.371 0A.93.93 0 0 0 0 .932c0 .246.1.48.288.662l4.28 4.125a.99.99 0 0 0 1.37.01z"
    })),
    onClick: handleCollapseClick
  }, expanded ? 'Less' : 'More', " options")) : null)), /*#__PURE__*/external_react_default().createElement("div", {
    className: "wallet-adapter-modal-overlay",
    onMouseDown: handleClose
  })), portal);
};
;// CONCATENATED MODULE: ./node_modules/@solana/wallet-adapter-react-ui/lib/WalletModalButton.js
var WalletModalButton_rest = undefined && undefined.__rest || function (s, e) {
  var t = {};

  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};




const WalletModalButton = _a => {
  var {
    children = 'Select Wallet',
    onClick
  } = _a,
      props = WalletModalButton_rest(_a, ["children", "onClick"]);

  const {
    visible,
    setVisible
  } = useWalletModal();
  const handleClick = (0,external_react_.useCallback)(event => {
    if (onClick) onClick(event);
    if (!event.defaultPrevented) setVisible(!visible);
  }, [onClick, setVisible, visible]);
  return /*#__PURE__*/external_react_default().createElement(Button, Object.assign({
    className: "wallet-adapter-button-trigger",
    onClick: handleClick
  }, props), children);
};
;// CONCATENATED MODULE: ./node_modules/@solana/wallet-adapter-react-ui/lib/WalletModalProvider.js
var WalletModalProvider_rest = undefined && undefined.__rest || function (s, e) {
  var t = {};

  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};




const WalletModalProvider = _a => {
  var {
    children
  } = _a,
      props = WalletModalProvider_rest(_a, ["children"]);

  const {
    0: visible,
    1: setVisible
  } = (0,external_react_.useState)(false);
  return /*#__PURE__*/external_react_default().createElement(WalletModalContext.Provider, {
    value: {
      visible,
      setVisible
    }
  }, children, visible && /*#__PURE__*/external_react_default().createElement(WalletModal, Object.assign({}, props)));
};
;// CONCATENATED MODULE: ./node_modules/@solana/wallet-adapter-react-ui/lib/WalletDisconnectButton.js
var WalletDisconnectButton_rest = undefined && undefined.__rest || function (s, e) {
  var t = {};

  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};





const WalletDisconnectButton = _a => {
  var {
    children,
    disabled,
    onClick
  } = _a,
      props = WalletDisconnectButton_rest(_a, ["children", "disabled", "onClick"]);

  const {
    wallet,
    disconnect,
    disconnecting
  } = (0,lib/* useWallet */.Os)();
  const handleClick = (0,external_react_.useCallback)(event => {
    if (onClick) onClick(event); // eslint-disable-next-line @typescript-eslint/no-empty-function

    if (!event.defaultPrevented) disconnect().catch(() => {});
  }, [onClick, disconnect]);
  const content = (0,external_react_.useMemo)(() => {
    if (children) return children;
    if (disconnecting) return 'Disconnecting ...';
    if (wallet) return 'Disconnect';
    return 'Disconnect Wallet';
  }, [children, disconnecting, wallet]);
  return /*#__PURE__*/external_react_default().createElement(Button, Object.assign({
    className: "wallet-adapter-button-trigger",
    disabled: disabled || !wallet,
    startIcon: wallet ? /*#__PURE__*/external_react_default().createElement(WalletIcon, {
      wallet: wallet
    }) : undefined,
    onClick: handleClick
  }, props), content);
};
;// CONCATENATED MODULE: ./node_modules/@solana/wallet-adapter-react-ui/lib/WalletMultiButton.js
var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var WalletMultiButton_rest = undefined && undefined.__rest || function (s, e) {
  var t = {};

  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};








const WalletMultiButton = _a => {
  var {
    children
  } = _a,
      props = WalletMultiButton_rest(_a, ["children"]);

  const {
    publicKey,
    wallet,
    disconnect
  } = (0,lib/* useWallet */.Os)();
  const {
    setVisible
  } = useWalletModal();
  const {
    0: copied,
    1: setCopied
  } = (0,external_react_.useState)(false);
  const {
    0: active,
    1: setActive
  } = (0,external_react_.useState)(false);
  const ref = (0,external_react_.useRef)(null);
  const base58 = (0,external_react_.useMemo)(() => publicKey === null || publicKey === void 0 ? void 0 : publicKey.toBase58(), [publicKey]);
  const content = (0,external_react_.useMemo)(() => {
    if (children) return children;
    if (!wallet || !base58) return null;
    return base58.slice(0, 4) + '..' + base58.slice(-4);
  }, [children, wallet, base58]);
  const copyAddress = (0,external_react_.useCallback)(() => __awaiter(void 0, void 0, void 0, function* () {
    if (base58) {
      yield navigator.clipboard.writeText(base58);
      setCopied(true);
      setTimeout(() => setCopied(false), 400);
    }
  }), [base58]);
  const openDropdown = (0,external_react_.useCallback)(() => setActive(true), [setActive]);
  const closeDropdown = (0,external_react_.useCallback)(() => setActive(false), [setActive]);
  const openModal = (0,external_react_.useCallback)(() => {
    setVisible(true);
    closeDropdown();
  }, [setVisible, closeDropdown]);
  (0,external_react_.useEffect)(() => {
    const listener = event => {
      const node = ref.current; // Do nothing if clicking dropdown or its descendants

      if (!node || node.contains(event.target)) return;
      closeDropdown();
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, closeDropdown]);
  if (!wallet) return /*#__PURE__*/external_react_default().createElement(WalletModalButton, Object.assign({}, props), children);
  if (!base58) return /*#__PURE__*/external_react_default().createElement(WalletConnectButton, Object.assign({}, props), children);
  return /*#__PURE__*/external_react_default().createElement("div", {
    className: "wallet-adapter-dropdown"
  }, /*#__PURE__*/external_react_default().createElement(Button, Object.assign({
    "aria-expanded": active,
    className: "wallet-adapter-button-trigger",
    style: Object.assign({
      pointerEvents: active ? 'none' : 'auto'
    }, props.style),
    onClick: openDropdown,
    startIcon: /*#__PURE__*/external_react_default().createElement(WalletIcon, {
      wallet: wallet
    })
  }, props), content), /*#__PURE__*/external_react_default().createElement("ul", {
    "aria-label": "dropdown-list",
    className: `wallet-adapter-dropdown-list ${active && 'wallet-adapter-dropdown-list-active'}`,
    ref: ref,
    role: "menu"
  }, /*#__PURE__*/external_react_default().createElement("li", {
    onClick: copyAddress,
    className: "wallet-adapter-dropdown-list-item",
    role: "menuitem"
  }, copied ? 'Copied' : 'Copy address'), /*#__PURE__*/external_react_default().createElement("li", {
    onClick: openModal,
    className: "wallet-adapter-dropdown-list-item",
    role: "menuitem"
  }, "Connect a different wallet"), /*#__PURE__*/external_react_default().createElement("li", {
    onClick: disconnect,
    className: "wallet-adapter-dropdown-list-item",
    role: "menuitem"
  }, "Disconnect")));
};
;// CONCATENATED MODULE: ./node_modules/@solana/wallet-adapter-react-ui/lib/index.js









/***/ }),

/***/ 7627:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "U": () => (/* reexport */ ConnectionProvider),
  "nS": () => (/* reexport */ WalletProvider),
  "Os": () => (/* reexport */ useWallet_useWallet)
});

// UNUSED EXPORTS: ConnectionContext, WalletContext, WalletNotSelectedError, useAnchorWallet, useConnection, useLocalStorage

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(9297);
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);
;// CONCATENATED MODULE: ./node_modules/@solana/wallet-adapter-react/lib/useWallet.js

const WalletContext = /*#__PURE__*/(0,external_react_.createContext)({});
function useWallet_useWallet() {
  return (0,external_react_.useContext)(WalletContext);
}
;// CONCATENATED MODULE: ./node_modules/@solana/wallet-adapter-react/lib/useAnchorWallet.js


function useAnchorWallet() {
  const {
    publicKey,
    signTransaction,
    signAllTransactions
  } = useWallet();
  return useMemo(() => publicKey && signTransaction && signAllTransactions ? {
    publicKey,
    signTransaction,
    signAllTransactions
  } : undefined, [publicKey, signTransaction, signAllTransactions]);
}
// EXTERNAL MODULE: external "@solana/web3.js"
var web3_js_ = __webpack_require__(5681);
;// CONCATENATED MODULE: ./node_modules/@solana/wallet-adapter-react/lib/useConnection.js

const ConnectionContext = /*#__PURE__*/(0,external_react_.createContext)({});
function useConnection() {
  return useContext(ConnectionContext);
}
;// CONCATENATED MODULE: ./node_modules/@solana/wallet-adapter-react/lib/ConnectionProvider.js



const ConnectionProvider = ({
  children,
  endpoint,
  config = {
    commitment: 'confirmed'
  }
}) => {
  const connection = (0,external_react_.useMemo)(() => new web3_js_.Connection(endpoint, config), [endpoint, config]);
  return /*#__PURE__*/external_react_default().createElement(ConnectionContext.Provider, {
    value: {
      connection
    }
  }, children);
};
// EXTERNAL MODULE: ./node_modules/@solana/wallet-adapter-base/lib/index.js + 4 modules
var lib = __webpack_require__(4637);
;// CONCATENATED MODULE: ./node_modules/@solana/wallet-adapter-react/lib/errors.js

class WalletNotSelectedError extends lib/* WalletError */.lj {
  constructor() {
    super(...arguments);
    this.name = 'WalletNotSelectedError';
  }

}
;// CONCATENATED MODULE: ./node_modules/@solana/wallet-adapter-react/lib/useLocalStorage.js

function useLocalStorage(key, defaultState) {
  const {
    0: value,
    1: setValue
  } = (0,external_react_.useState)(() => {
    if (typeof localStorage === 'undefined') return defaultState;
    const value = localStorage.getItem(key);

    try {
      return value ? JSON.parse(value) : defaultState;
    } catch (error) {
      console.warn(error);
      return defaultState;
    }
  });
  const setLocalStorage = (0,external_react_.useCallback)(newValue => {
    if (newValue === value) return;
    setValue(newValue);

    if (newValue === null) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(newValue));
    }

    if (newValue === null) {
      localStorage.removeItem(key);
    } else {
      try {
        localStorage.setItem(key, JSON.stringify(newValue));
      } catch (error) {
        console.error(error);
      }
    }
  }, [value, setValue, key]);
  return [value, setLocalStorage];
}
;// CONCATENATED MODULE: ./node_modules/@solana/wallet-adapter-react/lib/WalletProvider.js
var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};






const initialState = {
  wallet: null,
  adapter: null,
  ready: false,
  publicKey: null,
  connected: false
};
const WalletProvider = ({
  children,
  wallets,
  autoConnect = false,
  onError = error => console.error(error),
  localStorageKey = 'walletName'
}) => {
  const [name, setName] = useLocalStorage(localStorageKey, null);
  const {
    0: {
      wallet,
      adapter,
      ready,
      publicKey,
      connected
    },
    1: setState
  } = (0,external_react_.useState)(initialState);
  const {
    0: connecting,
    1: setConnecting
  } = (0,external_react_.useState)(false);
  const {
    0: disconnecting,
    1: setDisconnecting
  } = (0,external_react_.useState)(false);
  const isConnecting = (0,external_react_.useRef)(false);
  const isDisconnecting = (0,external_react_.useRef)(false); // Map of wallet names to wallets

  const walletsByName = (0,external_react_.useMemo)(() => wallets.reduce((walletsByName, wallet) => {
    walletsByName[wallet.name] = wallet;
    return walletsByName;
  }, {}), [wallets]); // When the selected wallet changes, initialize the state

  (0,external_react_.useEffect)(() => {
    const wallet = name && walletsByName[name] || null;
    const adapter = wallet && wallet.adapter();

    if (adapter) {
      const {
        ready,
        publicKey,
        connected
      } = adapter;
      setState({
        wallet,
        adapter,
        connected,
        publicKey,
        ready
      });
    } else {
      setState(initialState);
    }
  }, [name, walletsByName, setState]); // If autoConnect is enabled, try to connect when the adapter changes and is ready

  (0,external_react_.useEffect)(() => {
    if (isConnecting.current || connecting || connected || !autoConnect || !adapter || !ready) return;

    (function () {
      return __awaiter(this, void 0, void 0, function* () {
        isConnecting.current = true;
        setConnecting(true);

        try {
          yield adapter.connect();
        } catch (error) {
          // Clear the selected wallet
          setName(null); // Don't throw error, but onError will still be called
        } finally {
          setConnecting(false);
          isConnecting.current = false;
        }
      });
    })();
  }, [isConnecting, connecting, connected, autoConnect, adapter, ready, setConnecting, setName]); // Select a wallet by name

  const select = (0,external_react_.useCallback)(newName => __awaiter(void 0, void 0, void 0, function* () {
    if (name === newName) return;
    if (adapter) yield adapter.disconnect();
    setName(newName);
  }), [name, adapter, setName]); // Handle the adapter's ready event

  const onReady = (0,external_react_.useCallback)(() => setState(state => Object.assign(Object.assign({}, state), {
    ready: true
  })), [setState]); // Handle the adapter's connect event

  const onConnect = (0,external_react_.useCallback)(() => {
    if (!adapter) return;
    const {
      connected,
      publicKey,
      ready
    } = adapter;
    setState(state => Object.assign(Object.assign({}, state), {
      connected,
      publicKey,
      ready
    }));
  }, [adapter, setState]); // Handle the adapter's disconnect event

  const onDisconnect = (0,external_react_.useCallback)(() => setName(null), [setName]); // Connect the adapter to the wallet

  const connect = (0,external_react_.useCallback)(() => __awaiter(void 0, void 0, void 0, function* () {
    if (isConnecting.current || connecting || disconnecting || connected) return;

    if (!wallet || !adapter) {
      const error = new WalletNotSelectedError();
      onError(error);
      throw error;
    }

    if (!ready) {
      setName(null);

      if (false) {}

      const error = new lib/* WalletNotReadyError */.OZ();
      onError(error);
      throw error;
    }

    isConnecting.current = true;
    setConnecting(true);

    try {
      yield adapter.connect();
    } catch (error) {
      setName(null);
      throw error;
    } finally {
      setConnecting(false);
      isConnecting.current = false;
    }
  }), [isConnecting, connecting, disconnecting, connected, wallet, adapter, onError, ready, setConnecting, setName]); // Disconnect the adapter from the wallet

  const disconnect = (0,external_react_.useCallback)(() => __awaiter(void 0, void 0, void 0, function* () {
    if (isDisconnecting.current || disconnecting) return;
    if (!adapter) return setName(null);
    isDisconnecting.current = true;
    setDisconnecting(true);

    try {
      yield adapter.disconnect();
    } finally {
      setName(null);
      setDisconnecting(false);
      isDisconnecting.current = false;
    }
  }), [isDisconnecting, disconnecting, adapter, setDisconnecting, setName]); // Send a transaction using the provided connection

  const sendTransaction = (0,external_react_.useCallback)((transaction, connection, options) => __awaiter(void 0, void 0, void 0, function* () {
    if (!adapter) {
      const error = new WalletNotSelectedError();
      onError(error);
      throw error;
    }

    if (!connected) {
      const error = new lib/* WalletNotConnectedError */.oS();
      onError(error);
      throw error;
    }

    return yield adapter.sendTransaction(transaction, connection, options);
  }), [adapter, onError, connected]); // Sign a transaction if the wallet supports it

  const signTransaction = (0,external_react_.useMemo)(() => adapter && 'signTransaction' in adapter ? transaction => __awaiter(void 0, void 0, void 0, function* () {
    if (!connected) {
      const error = new lib/* WalletNotConnectedError */.oS();
      onError(error);
      throw error;
    }

    return yield adapter.signTransaction(transaction);
  }) : undefined, [adapter, onError, connected]); // Sign multiple transactions if the wallet supports it

  const signAllTransactions = (0,external_react_.useMemo)(() => adapter && 'signAllTransactions' in adapter ? transactions => __awaiter(void 0, void 0, void 0, function* () {
    if (!connected) {
      const error = new lib/* WalletNotConnectedError */.oS();
      onError(error);
      throw error;
    }

    return yield adapter.signAllTransactions(transactions);
  }) : undefined, [adapter, onError, connected]); // Sign an arbitrary message if the wallet supports it

  const signMessage = (0,external_react_.useMemo)(() => adapter && 'signMessage' in adapter ? message => __awaiter(void 0, void 0, void 0, function* () {
    if (!connected) {
      const error = new lib/* WalletNotConnectedError */.oS();
      onError(error);
      throw error;
    }

    return yield adapter.signMessage(message);
  }) : undefined, [adapter, onError, connected]); // Setup and teardown event listeners when the adapter changes

  (0,external_react_.useEffect)(() => {
    if (adapter) {
      adapter.on('ready', onReady);
      adapter.on('connect', onConnect);
      adapter.on('disconnect', onDisconnect);
      adapter.on('error', onError);
      return () => {
        adapter.off('ready', onReady);
        adapter.off('connect', onConnect);
        adapter.off('disconnect', onDisconnect);
        adapter.off('error', onError);
      };
    }
  }, [adapter, onReady, onConnect, onDisconnect, onError]);
  return /*#__PURE__*/external_react_default().createElement(WalletContext.Provider, {
    value: {
      wallets,
      autoConnect,
      wallet,
      adapter,
      publicKey,
      ready,
      connected,
      connecting,
      disconnecting,
      select,
      connect,
      disconnect,
      sendTransaction,
      signTransaction,
      signAllTransactions,
      signMessage
    }
  }, children);
};
;// CONCATENATED MODULE: ./node_modules/@solana/wallet-adapter-react/lib/index.js








/***/ })

};
;