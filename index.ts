require('dotenv').config();
import * as app from "express";
import { createServer } from "http";

// @ts-ignore
const server = createServer(app);

const io = require("socket.io")(server, {
    cors: {
        origin: '*',
    },
});

let saleEndDate = process.env.SALE_END_DATE as string;

io.on("connection", (socket: any) => {
    socket.on("GET_TIMER", () => {
        console.log("Getting Timer req")
        setInterval(() => {
            console.log('claculating')
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
        }, 1000)
    });
});

server.listen(process.env.PORT, () => {
    console.log("server listening at port 3003");
});