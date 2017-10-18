'use strict';
const request = require('request');
const crypto = require('crypto');
const url = require('url');
const _ = require('lodash');

function Client(options, ctx) {
  if (!(this instanceof Client)) {
    return new Client(options, ctx);
  }
  if (options && options.inited) {
    Client.options = options;
  } else {
    Client.options = initOptions(options);
  }
}

function initOptions(options) {
  if (!options || !options.org_client_id || !options.org_client_secret) {
    throw new Error('require org_client_id, org_client_secret');
  }
  if (!options.host) {
    options.host = 'yk3-api-ent.gokuai.com';
  }
  let opts = {};
  for (const key in options) {
    if (Object.prototype.hasOwnProperty.call(options, key)) {
      opts[key] = options[key];
    }
  }

  opts.org_client_id = opts.org_client_id.trim();
  opts.org_client_secret = opts.org_client_secret.trim();

  opts.inited = true;
  return opts;
}

// 发起请求
Client.prototype.request = function (pathname, params, callback) {
  let method = 'POST';
  let dateline = Math.floor(Date.now() / 1000);
  let client_id = Client.options.org_client_id;
  params.dateline = dateline;
  params.client_id = client_id;
  params.sign = this.signature(params, Client.options.org_client_secret);

  let opt = {
    url: getUrl(pathname),
    method: method,
    form: params
  };

  request(opt, (err, response, body) => {
    // 请求错误，发生网络错误
    if (err) {
      return callback(err);
    }

    let statusCode = response.statusCode;
    // 请求返回码不为 200
    if (statusCode !== 200) {
      return callback(body);
    }
    callback(null, body);
  });
};

// 签名方法
Client.prototype.signature = function (query, key) {
  let values = _.values(_.fromPairs(_.toPairs(query).sort())).join('\n');
  return encodeURI(hmac(values, key));
};

function hmac(string, key) {
  return crypto
    .createHmac('sha1', key)
    .update(string, 'utf8')
    .digest('base64');
}

// 生成操作 url
function getUrl(pathname) {
  let reqUrl = url.parse(Client.options.host);
  if (!reqUrl.protocol) {
    reqUrl = url.parse('http://' + Client.options.host);
  }
  reqUrl.pathname = pathname;
  return url.format(reqUrl);
}

module.exports = Client;
