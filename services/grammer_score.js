const { postCall } = require('../lib/request-client');

// this should go in environment variables
const url = "https://gi3domjqhj3gk4ttnfxw4lzrfyydu3lpmnvwk4roobzgs43nfz4w23a.prism.stoplight.io/evaluate/grammar"

module.exports = async function(text){
    // post call will retun data in format {statusCode: 200, body: {score: 23}
  const response = await postCall(url, {text: text});
  return response.body.score;
};
