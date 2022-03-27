const express = require("express");
const route = express.Router();

const outboundController = require("../controllers/outbound");

route.post("/", outboundController.getRevealing);

module.exports = route;