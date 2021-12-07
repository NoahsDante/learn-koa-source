const response = {
  _body:undefined,
  get body() {
    return this._body;
  },
  set body(content) {
    // 如果用户设置修改body 状态码为200
    this.res.statusCode = 200;
    this._body = content;
  }

};
module.exports = response;