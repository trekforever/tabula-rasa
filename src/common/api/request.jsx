import Superagent from "superagent"
import Promise from "bluebird"

Superagent.Request.prototype.promise = function(options) {
  var req = this;
  var error;
  options = options || { cancellable: false };

  var promise = new Promise(function(resolve, reject) {
    req.end(function(err, res) {
      if (typeof res !== "undefined" && res.status >= 400) {
        var msg = 'cannot ' + req.method + ' ' + req.url + ' (' + res.status + ')';
        error = new Error(msg);
        error.status = res.status;
        error.body = res.body;
        error.res = res;
        reject(error);
      } else if (err) {
        reject(new Error(err));
      } else {
        resolve(res);
      }
    });
  });

  if (options.cancellable) {
    promise = promise
      .cancellable()
      .catch(Promise.CancellationError, function(e) {
        req.abort();
        throw e;
    });
  }

  return promise;
};

var defaultHeaders = {};
function isObject(obj) { return Object(obj) === obj; };

function request(method, url) {
   return Superagent(method, url).set(defaultHeaders);
}
request.set = function (field, value) {
   if (isObject(field)) {
      for(var key in field) this.set(key, field[key]);
      return this;
   }
   defaultHeaders[field] = value;
   return this;
}
export default request;