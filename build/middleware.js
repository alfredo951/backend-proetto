"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = __importStar(require("jsonwebtoken"));
var verifyToken = function (req, res, next) {
    var token = req.headers['authorization'];
    if (!token) {
        return res.status(403).json({ message: "token is required" });
    }
    try {
        token = token.replace(/^Bearer\s+/, "");
        var decode = jwt.verify(token, 'iaffioComanda');
        console.log(decode);
        req.body.userExist = decode;
        req.userExist = decode;
        console.log(decode);
    }
    catch (error) {
        return res.status(401).json({ message: "invalid Token" });
    }
    return next();
};
exports.default = verifyToken;
