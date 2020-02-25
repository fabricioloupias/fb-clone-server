"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const api_constants_1 = require("./constants/api.constants");
app_1.default.listen(api_constants_1.PORT, () => console.log(`Listening on port ${api_constants_1.PORT}`));
