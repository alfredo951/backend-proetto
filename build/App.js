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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var cors_1 = __importDefault(require("cors"));
var jwt = __importStar(require("jsonwebtoken"));
var express_2 = require("express");
var middleware_1 = __importDefault(require("./middleware"));
var router = (0, express_2.Router)();
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: "http://localhost:5173" }));
// Helpers
app.post("/api/auth/login", function (req, res) {
    try {
        console.log(req.body);
        if (req.body && req.body.name && req.body.password) {
            console.log(req.body.name);
            if (req.body.name === "ciao" && req.body.password === "ciao") {
                var expirationDate = new Date(Date.now() + 5 * 60 * 1000).getTime();
                var token = jwt.sign({ name: req.body.name, password: req.body.password, idprofile: "1234", scadenza: expirationDate,
                }, "iaffioComanda");
                console.log(req.body.name, token);
                return res.status(200).json({ name: req.body.name, token: token, idprofile: "1234" });
            }
            else {
                return res.status(400).json({ message: "invalid credential" });
            }
        }
        else {
            return res.status(400).json({ message: "bad request" });
        }
    }
    catch (error) {
        return res.status(500).json({ message: "somthing went wrong; please try again" + error });
    }
});
app.use(router.get("/api/component/menu", middleware_1.default, function (_, res) {
    console.log("ciao");
    return res.status(200).json([{ title: "Home", links: [{ name: "wafer", link: "/wafer" }] }, { title: "Chisiamo", link: "/chisiamo" }, { title: "Wafering", links: [{ name: "wafer", link: "/wafer" }] }, { title: "Sing", links: [{ name: "wafer", link: "/wafer" }] }]);
}));
function print(path, layer) {
    if (layer.route) {
        layer.route.stack.forEach(print.bind(null, path.concat(split(layer.route.path))));
    }
    else if (layer.name === 'router' && layer.handle.stack) {
        layer.handle.stack.forEach(print.bind(null, path.concat(split(layer.regexp))));
    }
    else if (layer.method) {
        console.log('%s /%s', layer.method.toUpperCase(), path.concat(split(layer.regexp)).filter(Boolean).join('/'));
    }
}
function split(thing) {
    if (typeof thing === 'string') {
        return thing.split('/');
    }
    else if (thing.fast_slash) {
        return '';
    }
    else {
        var match = thing.toString()
            .replace('\\/?', '')
            .replace('(?=\\/|$)', '$')
            .match(/^\/\^((?:\\[.*+?^${}()|[\]\\\/]|[^.*+?^${}()|[\]\\\/])*)\$\//);
        return match
            ? match[1].replace(/\\(.)/g, '$1').split('/')
            : '<complex:' + thing.toString() + '>';
    }
}
app._router.stack.forEach(print.bind(null, []));
dotenv_1.default.config();
app.listen(process.env.SERVER_PORT, function () {
    console.log("server runnning " + process.env.SERVER_PORT + " ");
});
