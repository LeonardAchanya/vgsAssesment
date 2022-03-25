const express = require("express");
const route = express.Router();

const inboundController = require("../controllers/inbound");

route.post("/", inboundController.getInbound);
route.post("/reveal", inboundController.getRevealing);

module.exports = route;