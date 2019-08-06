const request = require('request')
module.exports = {
  postCall: function(url, data){
    return new Promise((resolve, reject) => {
      request.post(url, {
        json: data
      },(error, res, body) => {
        if (error) {
          console.error(error)
          reject(error);
        }
        resolve({statusCode: res.statusCode, body: body});
      });
    });
  }
}
