"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FORGET_PASSWORD_PREFIX = exports.COOKIE_NAME = exports.USE_STUDIO_APOLLO = exports.PROD_ENV = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.PROD_ENV = process.env.NODE_ENV === "production";
exports.USE_STUDIO_APOLLO = process.env.STUDIO_APOLLO_ENV === "yes";
exports.COOKIE_NAME = "qid";
exports.FORGET_PASSWORD_PREFIX = "forget-password:";
//# sourceMappingURL=constants.js.map