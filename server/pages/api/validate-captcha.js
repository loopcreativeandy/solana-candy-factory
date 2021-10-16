"use strict";
(() => {
var exports = {};
exports.id = 463;
exports.ids = [463];
exports.modules = {

/***/ 9428:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2376);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);

async function handler(req, res) {
  const {
    token
  } = req.body;
  const VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";
  const {
    data
  } = await axios__WEBPACK_IMPORTED_MODULE_0___default()(VERIFY_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    data: `secret=${process.env.RECAPTCHA_SECRET}&response=${token}`
  });
  res.status(200).json({
    success: !!data.success
  });
}

/***/ }),

/***/ 2376:
/***/ ((module) => {

module.exports = require("axios");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(9428));
module.exports = __webpack_exports__;

})();