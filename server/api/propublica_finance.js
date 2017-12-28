const rp = require('request-promise');

const propubFinApiKey = process.env.PROPUBLICA_CAMPAIGN_FIN_APIKEY;
const headers = { 'X-API-Key': propubFinApiKey };
const BASE_URL = 'https://api.propublica.org/campaign-finance/v1';

const propublica = {
  top20List: (req, res) => {
    const cycle = req.params.cycle;
    const category = req.params.category;
    const url = `${BASE_URL}/${cycle}/candidates/leaders/${category}.json`;
    const config = { url, headers };

    rp.get(config)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch(err => console.error(err));
  }
};

module.exports = propublica;
