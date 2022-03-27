require("dotenv").config(); // allows our project read variables from .env files
const fetch = require("node-fetch");

exports.getInbound = (req, res, next) => {
  // console.log('inbound');
  // const { account_number } = req.body;
  const { card_number,card_cvc } = req.body;
  async function getData() {
    let result;
    try {
      result = await fetch(
        "https://tntozktay65.sandbox.verygoodproxy.com/post",
        {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            },
          body: JSON.stringify({ 
              card_number,
              card_cvc
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