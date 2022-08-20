"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CORS_LOCALHOST = exports.FORGET_PASSWORD_PREFIX = exports.COOKIE_NAME = exports.PROD_ENV = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.PROD_ENV = process.env.NODE_ENV === "production";
exports.COOKIE_NAME = "qid";
exports.FORGET_PASSWORD_PREFIX = "forget-password:";
exports.CORS_LOCALHOST = process.env.CORS_ORIGIN === "http://localhost:3000";
//# sourceMappingURL=constants.js.map