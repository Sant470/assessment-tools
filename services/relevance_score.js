const { postCall } = require('../lib/request-client');
const url = "https://gi3domjqhj3gk4ttnfxw4lzrfyydu3lpmnvwk4roobzgs43nfz4w23a.prism.stoplight.io/evaluate/relevance"

// @topics should be an array
module.exports = async function(text, topics){
  
  // post call will retun data in format {statusCode: 200, body: {score: 23}}
  const response = await postCall(url, {text: text, topics: topics})
  return response.body.score;
};
