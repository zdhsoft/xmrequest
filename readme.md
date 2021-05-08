# 一个基于got，再次封装的node下面简单封装的request请求
- 注意版本要求node 10.x及以上版本 由于依赖got中的cacheable-lookup， 需要node>=10.6.0, so

- github: https://github.com/zdhsoft/xmrequest
- npm: https://www.npmjs.com/package/xmrequest

## 历史记录
- 1.0.1
  - 2021-05-08
    - \+ 修复返回值不是统一接口 IGotRequestReturn 的bug
- 1.0.0
  - 2021-05-07
    - \+ 1.0版正式发布
- 0.9.4
  - 2021-05-07
    - \+ 增加使用案例
- 0.9.3
  - 2021-05-07
    - \+ 修改程序入口

- 0.9.2
  - 2021-05-07
    - \+ 将GotUtils改名为xmrequest,重新发布
```typescript
import {xmrequest} from 'xmrequest';
let r = xmrequest.post('http://test.com/version', {name: 'test'});
console.log(r);

```

- 0.9.1
  - 2021-05-07
    - \+ 增加MIT License文件

- 0.9.0
  - 2021-05-07
    - \+ 实现GotUtils
- 0.0.2
  - 2021-05-06
    - \* 删除原有的js代码，改为ts，去除原有的request依赖，改为got。
    - \* 将临时文件增加忽略文件中。
    - \* 将xmcommon的依赖提升到最新的版本。

## 接口定义
```typescript
import { Options, Response, RequestError, Headers } from 'got';
/** HTTP的方法 */
export declare enum EnumHttpMethod {
    get = "GET",
    post = "POST",
    put = "PUT",
    patch = "PATCH",
    head = "HEAD",
    delete = "DELETE",
    options = "OPTIONS",
    trace = "TRACE"
}
/** 成功失败的错误码 */
export declare enum EnumGotUtilsError {
    OK = 0,
    FAIL = -1
}
/** Got请求返回顺的数据 */
export interface IGotRequestReturn {
    /** 抛出的异常 */
    error?: RequestError;
    /** Http请求的错误码，如200 */
    statusCode?: number;
    /** http请求返回的信息 */
    statusMessage?: string;
    /** 响应的http body */
    body?: string;
    /** 响应对象 */
    response?: Response<string>;
}
/**
 * xmrequest说明
 * - 由于request已经停止更新，并且已经标记为deprecated了，为了未来的使用考虑，所以使用got代替request, 实现了这个类
 * - 处理的结果与RequestUtils一样
 */
export declare class xmrequest {
    /**
     * 初始化选项
     * - 这里会增加一个user-agent的header选项
     * @param paramOptions 默认传入的选项
     * @param paramMethod 要设置的方法 @see EnumHttpMethod
     * @param paramheaders http的header选项
     * @return 返回初始化的options
     */
    private static initOptions;
    /**
     * 这个是通过 application/x-www-form-urlencoded 方式上传参数
     * @param paramURL 请求的URL
     * @param paramBody 要表求的消息
     * @param paramOptions 请求选项
     * @param paramHeaders 请求的headers信息
     * @return 响应结果
     */
    static post(paramURL: string, paramBody: any, paramOptions?: Options, paramheaders?: Headers): Promise<IGotRequestReturn>;
    /**
     * 这个是通过 application/x-www-form-urlencoded 方式上传参数
     * @param paramURL 请求的URL
     * @param paramBody 要表求的消息
     * @param paramOptions 请求选项
     * @param paramHeaders 请求的headers信息
     * @returns 响应结果
     */
    static jsonPost(paramURL: string, paramBody: any, paramOptions?: Options, paramheaders?: Headers): Promise<IGotRequestReturn>;
    /**
     * 这个是通过 get 方法调用请求
     * @param paramURL 请求的URL
     * @param {object} paramBody 要表求的消息
     * @param {object} paramOptions 请求选项
     * @param {object} paramHeaders 请求的headers信息
     * @returns {{error ?: object, statusCode ?: number, statusMessage ?: string, body ?: string, response ?: any}} 响应结果
     */
    static get(paramURL: string, paramBody: Record<string, string>, paramOptions?: {}, paramheaders?: {}): Promise<IGotRequestReturn>;
}
export default xmrequest;


```
