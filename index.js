"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
require('dotenv').config();
const app = __importStar(require("express"));
const http_1 = require("http");
// @ts-ignore
const server = (0, http_1.createServer)(app);
const io = require("socket.io")(server, {
    cors: {
        origin: '*',
    },
});
let saleEndDate = process.env.SALE_END_DATE;
io.on("connection", (socket) => {
    socket.on("GET_TIMER", () => {
        console.log("Getting Timer req");
        setInterval(() => {
            console.log('claculating');
            const tillDate = new Date(saleEndDate).getTime();
            const beginDate = new Date().getTime();
            const difference = tillDate - beginDate;
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hrs = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const mins = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const secs = Math.floor((difference % (1000 * 60)) / 1000);
            socket.emit("TIMER", {
                days,
                hrs,
                mins,
                secs,
            });
        }, 1000);
    });
});
server.listen(process.env.PORT, () => {
    console.log("server listening at port 3003");
});
