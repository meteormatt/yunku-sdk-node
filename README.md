# yunku-sdk-node [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]

够快企业开发平台 企业API Node.js SDK

http://developer.gokuai.com/

目前支持[部门和成员操作](http://developer.gokuai.com/yk3/ent.html) [库操作](http://developer.gokuai.com/yk3/library.html) [库文件操作](http://developer.gokuai.com/yk3/file.html)

- [安装](#安装)
- [初始化](#初始化)
- [部门和成员操作](#部门和成员操作)
	- [request(pathname, params, callback)](#request)
- [库操作](#库操作)
	- [request(pathname, params, callback)](#request-1)
- [库文件操作](#库文件操作)
	- [request(pathname, params, callback)](#request-2)
	- [multipart(pathname, params, callback)](#multipart)
	- [webupload(url, params, callback)](#webupload)

## 安装

```sh
$ npm install --save yunku-sdk-node
```

## 初始化

`client_id` `client_secret`属于[企业授权](http://developer.gokuai.com/grant/ent.html)

`org_client_id` `org_client_secret` 属于[库授权](http://developer.gokuai.com/grant/library.html)

`host` 为API域名. 例如`yk3-api-ent.gokuai.com`

```js
const yunkuSdkNode = require('yunku-sdk-node');
var api = new yunkuSdkNode({
  client_id: '',
  client_secret: '',
  org_client_id: '',
  org_client_secret: '',
  host: 'yk3-api-ent.gokuai.com'
});
```

### 部门和成员操作

http://developer.gokuai.com/yk3/ent.html
所有的操作都类似。请求参数中的`client_id` `dateline` `sign` 不需要填入。SDK会填充这些字段。

#### request

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
api.request('/1/ent/get_members', {}, (error, result) => {
  if (error) {
    console.error(error);
  } else {
    console.log(result);
  }
});
```

返回结果

```
{"list":[{"member_id":"1023117","out_id":"","account":"","member_name":"gyb","member_email":"a@gokuai.cn","state":"1"}],"count":"105"}
```

### 库操作

http://developer.gokuai.com/yk3/library.html
和`部门和成员操作`一样。

#### request

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

### 库文件操作

http://developer.gokuai.com/yk3/file.html
所有的操作都类似。请求参数中的`org_client_id` `dateline` `sign` 不需要填入。SDK会填充这些字段。

#### request

```js
request(pathname, params, callback)
```

参数：

- [pathname] {String} 请求路径
- [params] {Object} 请求参数。文档中的参数，除了org_client_id，dateline，sign

callback回调函数：

- [error] {Error} 错误。当HTTP返回状态码不是200时也会在这里返回。
- [body] {String} 返回结果。

以[文件列表](http://developer.gokuai.com/yk3/file.html#%E6%96%87%E4%BB%B6%E5%88%97%E8%A1%A8)为例

```js
api.request('/1/file/ls', {fullpath: '/'}, (error, result) => {
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

其中接口为multipart方式时，需要使用multipart方法

#### multipart

```js
multipart(pathname, params, callback)
```

参数：

- [pathname] {String} 请求路径
- [params] {Object} 请求参数。文档中的参数，除了org_client_id，dateline，sign

callback回调函数：

- [error] {Error} 错误。当HTTP返回状态码不是200时也会在这里返回。
- [body] {String} 返回结果。

以[上传文件](http://developer.gokuai.com/yk3/file.html#%E4%B8%8A%E4%BC%A0%E6%96%87%E4%BB%B6)为例

```
POST /1/file/create_file HTTP/1.1
```

```js
api.multipart('/1/file/create_file', {
  'fullpath': 'test.js',
  'filefield': 'file',
  'file': fs.createReadStream('./test.js')
}, (error, result) => {
  if (error) {
    console.error(error);
  } else {
    console.log(result);
  }
});
```

返回结果

```
{"hash":"7726e09cfc55dfe73286d49d0fef1f0d6ff177a2","fullpath":"test.js","filehash":"8f8dfac4e3f8e6d922c3a447d1600f03657d0ed9","filesize":725,"state":1}
```

[WEB直接上传文件](http://developer.gokuai.com/yk3/file.html#web%E7%9B%B4%E6%8E%A5%E4%B8%8A%E4%BC%A0%E6%96%87%E4%BB%B6)接口

步骤2:上传文件内容

```
[返回的服务器地址]/2/web_upload
```

需要使用webupload方法

#### webupload

```js
webupload(url, params, callback)
```

参数：

- [url] {String} 请求URL地址
- [params] {Object} 请求参数。文档中的参数，除了org_client_id，dateline，sign

callback回调函数：

- [error] {Error} 错误。当HTTP返回状态码不是200时也会在这里返回。
- [body] {String} 返回结果。

```js
api.webupload('http://192.168.0.58:8081/2/web_upload', {
  path: '',
  //上传的文件的名称
  name: 'test.js',
  //指定上传的文件数据的请求参数名称
  filefield: 'file',
  //要上传文件的数据，在HTTP entity body里面使用Multipart/form-data格式上传
  file: fs.createReadStream('./test.js')
}, (error, result) => {
  if (error) {
    console.error(error);
  } else {
    console.log(result);
  }
});
```

返回结果

```
{"hash":"22dfa1e3789de99b8211cf1911f9be90bfe39e24","filesize":1195,"fullpath":"test(3).js"}
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
