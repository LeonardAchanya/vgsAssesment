require("dotenv").config(); // allows our project read variables from .env files
const fetch = require("node-fetch");
const fs = require("fs");
const request = require("axios");
const tunnel = require("tunnel");
const cert = process.env.NODE_EXTRA_CA_CERTS;
const revealHost = process.env.REVEAL_HOST;
const revealPort = process.env.REVEAL_PORT;
const proxyUsername = process.env.REVEAL_USERNAME;
const proxyPassword = process.env.REVEAL_PASSWORD;


exports.getInbound = (req, res, next) => {
  // console.log('inbound');
//   const { account_number } = req.body;
  const { card_number,cvc } = req.body;
  async function getData() {
    let result;
    try {
      result = await fetch(
        "https://tntozktay65.sandbox.verygoodproxy.com/post",
        {
          method: "POST",
          //   headers: req.headers,
          headers: { 
            "Content-Type": "application/json",
            },
          body: JSON.stringify({ 
              card_number,
              cvc 
            }),
            // body: JSON.stringify({ 
            //     account_number 
            //   }),
          //   body: JSON.stringify({
          //     account_number: 'ACC00000000000000000',
          //   }),
        }
      );
    } catch (e) {
      console.error(e);
    }

    return await result.json();
  }

  getData()
    .then((response) => {
      // console.log(response)
      res.json(response);
    })
    .catch((err) => res.json({ msg: "error", err }));
};

exports.getRevealing = (req, res, next) => {
  const { account_number } = req.body;

  async function getData() {
    const tunnelingAgent = tunnel.httpsOverHttp({
      ca: [fs.readFileSync(`${cert}`)],
      proxy: {
        host: revealHost,
        port: revealPort,
        proxyAuth:
          `${proxyUsername}:${proxyPassword}`,
      },
    });

    const redactedPayload = {
      account_number,
    };

    return await request
      .post(
        "https://echo.apps.verygood.systems/post",
        JSON.stringify(redactedPayload),
        {
          httpsAgent: tunnelingAgent,
          proxy: false,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((r) => {
        // console.log('\\nResponse from Axios request on REVEAL:');
        // console.log(r.data);
        return r.data;
      });
  }
  getData()
    .then((response) => {
      // console.log(response)
      res.json(response);
    })
    .catch((err) => res.json({ msg: "error", err }));
};
