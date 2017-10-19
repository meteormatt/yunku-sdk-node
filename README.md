# yunku-sdk-node [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]

够快企业开发平台 企业API Node.js SDK

http://developer.gokuai.com/

目前支持`部门和成员操作` `库操作` `库文件操作`



## 安装

```sh
$ npm install --save yunku-sdk-node
```

## 初始化

`client_id` `client_secret`属于[企业授权](http://developer.gokuai.com/grant/ent.html)

`org_client_id` `org_client_secret` 属于[库授权](http://developer.gokuai.com/grant/library.html)

```js
const yunkuSdkNode = require('yunku-sdk-node');
var yunku = new yunkuSdkNode({
  client_id: '',
  client_secret: '',
  org_client_id: '',
  org_client_secret: '',
  host: 'yk3-api-ent.gokuai.com'
});
```

#### [部门和成员操作](http://developer.gokuai.com/yk3/ent.html)

所有的操作都类似。请求参数中的`client_id` `dateline` `sign` 不需要填入。SDK会填充这些字段。

```js
request(pathname, params, callback)
```

参数：

- [pathname] {String} 请求路径
- [params] {Object} 请求参数。文档中的参数，除了client_id，dateline，sign

callback回调函数：

- [error] {Error} 错误。当HTTP返回状态码不是200时也会在这里返回。
- [body] {String} 返回结果。

以[成员列表](http://developer.gokuai.com/yk3/ent.html#%E6%88%90%E5%91%98%E5%88%97%E8%A1%A8)为例

```js
yunku.request('/1/file/ls', {}, (error, result) => {
  if (error) {
    console.error(error);
  } else {
    console.log(result);
  }
});
```

返回结果

```
{"count":2,"list":[{"hash":"fe1c52606c292dbd034b26c68aa697dfb528e3ff","dir":0,"fullpath":"1.txt","filename":"1.txt","filehash":"9ef5991d1b20507eaeaa69f4204dac8c9f26da7f","filesize":657,"create_member_name":null,"create_dateline":1508393347,"last_member_name":null,"last_dateline":1508393347,"thumbnail":"http:\/\/yk3.goukuai.cn\/index\/thumb?mount_id=857139&type=txt&hash=fe1c52606c292dbd034b26c68aa697dfb528e3ff&filehash=9ef5991d1b20507eaeaa69f4204dac8c9f26da7f","property":"{\"tag\":\"\",\"collection_type\":\"\"}"},{"hash":"16bafd4436e53a42906176f841dc08cfe9a78098","dir":0,"fullpath":"Excel\u6587\u6863.xlsx","filename":"Excel\u6587\u6863.xlsx","filehash":"21af9a0386a60f130331aac363b98f42d175cbf9","filesize":6608,"create_member_name":"pmx123","create_dateline":1486625718,"last_member_name":"pmx123","last_dateline":1486625718,"thumbnail":"http:\/\/yk3.goukuai.cn\/index\/thumb?mount_id=857139&type=xlsx&hash=16bafd4436e53a42906176f841dc08cfe9a78098&filehash=21af9a0386a60f130331aac363b98f42d175cbf9","property":"{\"tag\":\"\",\"collection_type\":\"\"}"}],"dateline":"1508393347563","permisson":null}
```

#### [库操作](http://developer.gokuai.com/yk3/library.html)

和`部门和成员操作`一样。

以[库信息](http://developer.gokuai.com/yk3/library.html#%E5%BA%93%E4%BF%A1%E6%81%AF)为例

```js
api.request('/1/org/info', {org_id: 26817}, (error, result) => {
  if (error) {
    console.error(error);
  } else {
    console.log(result);
  }
});
```

返回结果

```
{"info":{"org_id":26817,"org_name":"\u6240\u6709\u6743\u9650","org_desc":"","org_logo_url":"http:\/\/gkavatar2.oss-cn-hangzhou.aliyuncs.com\/e2\/e295a7db46a9935b4fb32394ec36dc04d5046c3b.jpg","size_org_total":10737418240,"size_org_use":9840896817,"file_count":273,"dir_count":65,"mount_id":26818,"collection_code":""}}
```

## License

MPL-2.0 ©


[npm-image]: https://badge.fury.io/js/yunku-sdk-node.svg
[npm-url]: https://npmjs.org/package/yunku-sdk-node
[travis-image]: https://travis-ci.org/meteormatt/yunku-sdk-node.svg?branch=master
[travis-url]: https://travis-ci.org/meteormatt/yunku-sdk-node
[daviddm-image]: https://david-dm.org/meteormatt/yunku-sdk-node.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/meteormatt/yunku-sdk-node
[coveralls-image]: https://coveralls.io/repos/meteormatt/yunku-sdk-node/badge.svg
[coveralls-url]: https://coveralls.io/r/meteormatt/yunku-sdk-node
