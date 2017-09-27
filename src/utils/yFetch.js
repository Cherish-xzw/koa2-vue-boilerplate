/* eslint no-else-return:0 */
import 'whatwg-fetch';
import _ from 'lodash';
import StandardError from 'standard-error';

const host = location.origin;
const baseUrl = `${host}/api`;

/**
 * 当请求成功后, 这里根据{Request}req对象设置的headers['Accept']来决定如何处理返回的数据,如果没有设置accept头,则让应用自己决定如何处理返回
 * @param req
 * @param res
 * @returns {*}
 * @private
 */
const successHandler = (req, res) => {
  const accept = req.headers.Accept;
  let getBodyPromise;

  if (/^text\//.test(accept)) {
    getBodyPromise = res.text();
  } else if (/^application\/json$/.test(accept)) {
    getBodyPromise = res.json();
  } else if (/^(image|audio|video|application)\//.test(accept)) {
    getBodyPromise = res.blob();
  } else if (/^multipart\/form-data/.test(accept)) {
    getBodyPromise = res.formData();
  } else {
    getBodyPromise = Promise.resolve(res._bodyText);
  }
  return getBodyPromise.then(result => result);
};

/**
 * 错误格式化
 * @param  {object]} req  当前请求的options
 * @param  {object}  res  当前请求的response
 * @return {[type]}      [description]
 */
const errorFormatter = (req, res) => {
  return res.text().then(resText => {
    let errJson;
    try {
      errJson = JSON.parse(resText);
    } catch (ex) {
      errJson = { code: `${res.status}`, msg: resText };
    }

    return new StandardError({
      statusCode: res.status,
      ..._.pick(errJson, ['code', 'msg', 'message'])
    });
  });
};

/**
 * 捕捉错误类型
 * @param  {[type]} ex [description]
 * @return {[type]}    [description]
 */
const errorHandler = (ex) => {
  if (ex.statusCode === 401 && !location.href.match(/login/i)) {
    localStorage.removeItem('user');
    location.href = '/login';
  } else if (ex.statusCode === 400 || ex.statusCode === 401) {
    // console.log(ex.message);
    // message.error(ex.message)
  }

  return true;
};

/**
 * Create query URL
 * @param  {string} url  [description]
 * @param  {object} data [description]
 * @return {srting}      Returns query URL
 */
const createQueryUrl = (url, data) => {
  let payload = data || {};
  payload = _.pickBy(payload, _.identity);

  const params = _(payload).keys()
    .map(key => {
      const value = encodeURIComponent(payload[key]);
      return `${key}=${value}`;
    }).value();

  return params.length === 0 ? url : `${url}?${params.join('&')}`;
};

/**
 * Requests a URL, returning a promise
 * @param  {string} url        The URL we want to request
 * @param  {String} method     Request method
 * @param  {object} payload    Request parameters
 * @param  {object} apiOptions The options we want to pass to "fetch"
 * @return {object}            The response data
 */
export default function yFetch(url, method = 'GET', payload = null, apiOptions = {}) {
  const options = {
    method,
    credentials: 'include',
    headers: {
      Accept: 'application/json'
    }
  };

  let reqUrl = '';
  if (_.isString(url)) {
    reqUrl = `${baseUrl}${url}`;
  }

  if (method === 'GET') {
    reqUrl = createQueryUrl(reqUrl, payload);
  } else if (payload && payload.constructor === FormData) {
    options.body = payload;
  } else if (_.isObject(payload)) {
    options.headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(payload);
  }

  if (!_.isEmpty(apiOptions)) {
    options.headers = Object.assign({}, options, apiOptions.headers);
  }

  return fetch(reqUrl, options)
    .then(response => {
      if (response.status >= 200 && response.status < 300) {
        return successHandler(options, response);
      } else {
        return errorFormatter(options, response).then(err => {
          throw err;
        });
      }
    });
}

// 当Promise被rejected但又没有catch其错误时，unhandledrejection事件触发；该事件在全局范围内监听
window.addEventListener('unhandledrejection', (event) => {
  const ex = event.reason;
  if ((ex.constructor != null && ex.constructor === StandardError) || ex.message != null) {
    errorHandler(ex);
  }
});
