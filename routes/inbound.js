const express = require("express");
const route = express.Router();

const inboundController = require("../controllers/inbound");

route.post("/", inboundController.getInbound);

module.exports = route;