import _ from 'lodash';
import queryString from 'query-string';

const REQUEST_PARAMS = {
  credentials: 'same-origin',
};

const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
};

/**
 * Handles responses from API.
 */
class ApiResponse {
  static handle(response) {
    return new Promise((resolve, reject) => {
      response
        .json()
        .then((json) => {
          if (response.ok) {
            resolve(json);
          } else {
            const msg = json.errors || [
              `${json.message}`,
            ];
            reject(msg);
          }
        })
        .catch(() => {
          reject(['Not valid JSON']);
        });
    });
  }
}

/**
 * Sends requests to Api.
 */
export default class ApiRequest {
  /**
   * @param {string} url
   * @param {{}} params
   */
  static get(url, params = {}) {
    url = !_.isEmpty(params) ? `${url}?${queryString.stringify(params)}` : url;
    return fetch(url, REQUEST_PARAMS)
      .then(response => ApiResponse.handle(response));
  }

  /**
   * @param {string} url
   * @param {{}} body
   */
  static post(url, body = {}) {
    return fetch(
      url,
      _.assign({}, REQUEST_PARAMS, {
        method: 'POST',
        headers: DEFAULT_HEADERS,
        body: JSON.stringify(body),
      }),
    ).then(response => ApiResponse.handle(response));
  }

  /**
   * @param {string} url
   * @param {{}} body
   */
  static put(url, body = {}) {
    return fetch(
      url,
      _.assign({}, REQUEST_PARAMS, {
        method: 'PUT',
        headers: DEFAULT_HEADERS,
        body: JSON.stringify(body),
      }),
    ).then(response => ApiResponse.handle(response));
  }

  /**
   * @param {string} url
   * @param {{}} body
   */
  static delete(url, body = {}) {
    return fetch(
      url,
      _.assign({}, REQUEST_PARAMS, {
        method: 'DELETE',
        headers: DEFAULT_HEADERS,
        body: JSON.stringify(body),
      }),
    ).then(response => ApiResponse.handle(response));
  }
}