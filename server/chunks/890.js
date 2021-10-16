"use strict";
exports.id = 890;
exports.ids = [890];
exports.modules = {

/***/ 7890:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "T$": () => (/* binding */ fetchHashTable),
/* harmony export */   "j": () => (/* binding */ useHashTable)
/* harmony export */ });
/* unused harmony exports MAX_NAME_LENGTH, MAX_URI_LENGTH, MAX_SYMBOL_LENGTH, MAX_CREATOR_LEN */
/* harmony import */ var _project_serum_anchor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6391);
/* harmony import */ var _project_serum_anchor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_project_serum_anchor__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9297);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_hot_toast__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6533);
/* harmony import */ var react_hot_toast__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_hot_toast__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _metaplex_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2342);
/* harmony import */ var _metaplex_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_metaplex_js__WEBPACK_IMPORTED_MODULE_3__);




const rpcHost = "https://explorer-api.mainnet-beta.solana.com";
const connection = new _project_serum_anchor__WEBPACK_IMPORTED_MODULE_0__.web3.Connection(rpcHost);
const MAX_NAME_LENGTH = 32;
const MAX_URI_LENGTH = 200;
const MAX_SYMBOL_LENGTH = 10;
const MAX_CREATOR_LEN = 32 + 1 + 1;
async function fetchHashTable(hash, metadataEnabled) {
  const metadataAccounts = await _metaplex_js__WEBPACK_IMPORTED_MODULE_3__.MetadataProgram.getProgramAccounts(connection, {
    filters: [{
      memcmp: {
        offset: 1 + 32 + 32 + 4 + MAX_NAME_LENGTH + 4 + MAX_URI_LENGTH + 4 + MAX_SYMBOL_LENGTH + 2 + 1 + 4 + 0 * MAX_CREATOR_LEN,
        bytes: hash
      }
    }]
  });
  const mintHashes = [];

  for (let index = 0; index < metadataAccounts.length; index++) {
    const account = metadataAccounts[index];
    const accountInfo = await connection.getParsedAccountInfo(account.pubkey);
    const metadata = new _metaplex_js__WEBPACK_IMPORTED_MODULE_3__.Metadata(hash.toString(), accountInfo.value);
    if (metadataEnabled) mintHashes.push(metadata.data);else mintHashes.push(metadata.data.mint);
  }

  return mintHashes;
}
function useHashTable(candyMachineId, metadataEnabled) {
  const {
    0: hashTable,
    1: setHashTable
  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
  const {
    0: isLoading,
    1: setIsLoading
  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);

  const getHashTable = async () => {
    if (!candyMachineId || !candyMachineId.length) {
      react_hot_toast__WEBPACK_IMPORTED_MODULE_2___default().error("Please type the Candy Machine ID in the input box.");
      return;
    }

    try {
      setIsLoading(true);
      const data = await fetchHashTable(candyMachineId, metadataEnabled);
      setHashTable(data);
      if (data.length === 0) react_hot_toast__WEBPACK_IMPORTED_MODULE_2___default().success("Zero mint hashes have been found so far for this candy machine.");
    } catch (error) {
      console.error(error);
      react_hot_toast__WEBPACK_IMPORTED_MODULE_2___default().error("An error happened! Please try again later!");
    }

    setIsLoading(false);
  };

  return {
    hashTable,
    isLoading,
    getHashTable
  };
}

/***/ })

};
;