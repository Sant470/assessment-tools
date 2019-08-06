const { postCall } = require('../lib/request-client');
const url = "https://gi3domjqhj3gk4ttnfxw4lzrfyydu3lpmnvwk4roobzgs43nfz4w23a.prism.stoplight.io/evaluate/spellings"

module.exports = async function(text){
  // postCall will retun data in format {statusCode: 200, body: {score: 23}
  const response = await postCall(url, {text: text});
  return response.body.score;
};
