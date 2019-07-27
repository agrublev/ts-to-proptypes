"use strict";

var _index = require("./src/index.js");

var _editor = _interopRequireDefault(require("./src/editor"));

var _chalk = _interopRequireDefault(require("chalk"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// #!/usr/bin/env node
var argv = require("yargs").argv;

process.stdout.write("\x1b[2J");
process.stdout.write("\x1b[0f");
console.log("".concat(_chalk["default"].gray.bgWhite("Updated " + new Date())));

_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee() {
  var aa, aas, aass;
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log(_chalk["default"].green("Starting...")); //

          _context.next = 3;
          return (0, _index.run)({
            question: "HOW IS IT"
          });

        case 3:
          aa = _context.sent;
          _context.next = 6;
          return (0, _index.snippet)({
            question: "HOW IS IT"
          });

        case 6:
          aas = _context.sent;
          _context.next = 9;
          return (0, _index.multiSelect)({
            question: "HssfffIS IT"
          });

        case 9:
          aass = _context.sent;

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
}))();
