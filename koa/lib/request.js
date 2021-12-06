const url = require('url');
const request = {
  get url() { // 这就是为什么在request身加上一个req属性，为了快速的获取原生request的值
    return this.req.url;
  },
  get path() {
    const {pathname}  = url.parse(this.req.url);
    return pathname;
  },
  get query() {
    const {pathname,query}  = url.parse(this.req.url);
    return query;
  }
};
module.exports = request;