import got from 'got';
import { Options, Response, RequestError,Headers, CancelableRequest } from 'got';
import xmcommon from 'xmcommon';
import _ from 'lodash';

/** HTTP的方法 */
export enum EnumHttpMethod {
    get    = 'GET',
    post   = 'POST',
    put    = 'PUT',
    patch  = 'PATCH',
    head   = 'HEAD',
    delete = 'DELETE',
    options= 'OPTIONS',
    trace  = 'TRACE'
}
/** 成功失败的错误码 */
export enum EnumGotUtilsError {
    OK   = 0,
    FAIL = -1,
}
/** Got请求返回顺的数据 */
export interface IGotRequestReturn {
    /** 抛出的异常 */
    error           ?: RequestError,
    /** Http请求的错误码，如200 */
    statusCode      ?: number,
    /** http请求返回的信息 */
    statusMessage   ?: string;
    /** 响应的http body */
    body            ?: string;
    /** 响应对象 */
    response        ?: Response<string>;
}

/**
 * GotUtils说明
 * - 由于request已经停止更新，并且已经标记为deprecated了，为了未来的使用考虑，所以使用got代替request, 实现了这个类
 * - 处理的结果与RequestUtils一样
 */
export class GotUtils {
    /**
     * 初始化选项
     * - 这里会增加一个user-agent的header选项
     * @param paramOptions 默认传入的选项
     * @param paramMethod 要设置的方法 @see EnumHttpMethod
     * @param paramheaders http的header选项
     * @return 返回初始化的options
     */
    private static initOptions(paramOptions: Options, paramMethod: EnumHttpMethod, paramheaders: Headers) {

        if (xmcommon.utils.isNull(paramOptions)) {
            paramOptions = {};
        }

        if (!xmcommon.utils.isObject(paramOptions)) {
            paramOptions = {};
        }
        if (xmcommon.utils.isNull(paramheaders)) {
            paramheaders = {};
        }

        if (!xmcommon.utils.isObject(paramheaders)) {
            paramheaders = {};
        }
        let options = _.clone(paramOptions);

        options.headers = _.clone(paramheaders);
        options.method  = paramMethod;
        return options;
    }

    /**
     * 这个是通过 application/x-www-form-urlencoded 方式上传参数
     * @param paramURL 请求的URL
     * @param paramBody 要表求的消息
     * @param paramOptions 请求选项
     * @param paramHeaders 请求的headers信息
     * @return 响应结果
     */
    public static async post(paramURL: string, paramBody: any, paramOptions: Options = {}, paramheaders: Headers = {}): Promise<IGotRequestReturn> {
        let options = this.initOptions(paramOptions,  EnumHttpMethod.post, paramheaders);
        options.form = paramBody;

        try {
            // 实际上，这里返回的是CancelableRequest<Response<string>>;
            // 但是用它的时候，访问statusCode，会被提示要加await，实际是这个是没有的
            const r = (await got(paramURL, options)) as any;
            return {error: undefined, statusCode: r.statusCode, statusMessage: r.statusMessage, body: r.body, response: r.response};
        }catch(e) {
            let ret: IGotRequestReturn = { error: e };
            if (xmcommon.utils.isNotNull(e.response)) {
                ret.statusCode    = e.response.statusCode;
                ret.statusMessage = e.response.statusMessage;
                ret.response      = e.response;
            } else {
                ret.statusCode    = EnumGotUtilsError.FAIL;
                ret.statusMessage = e.message;
            }
            return ret;
        }
    }
    /**
     * 这个是通过 application/x-www-form-urlencoded 方式上传参数
     * @param paramURL 请求的URL
     * @param paramBody 要表求的消息
     * @param paramOptions 请求选项
     * @param paramHeaders 请求的headers信息
     * @returns 响应结果
     */
    public static async jsonPost(paramURL: string, paramBody: any, paramOptions: Options = {}, paramheaders: Headers = {}) {
        let options = this.initOptions(paramOptions, EnumHttpMethod.post, paramheaders);
        options.json = paramBody;

        try {
            const r = (await got(paramURL, options)) as any;
            return {error: undefined, statusCode: r.statusCode, statusMessage: r.statusMessage, body: r.body, response: r.response};
        }catch(e) {
            let ret: IGotRequestReturn = { error: e };
            if (xmcommon.utils.isNotNull(e.response)) {
                ret.statusCode    = e.response.statusCode;
                ret.statusMessage = e.response.statusMessage;
                ret.response      = e.response;
            } else {
                ret.statusCode    = EnumGotUtilsError.FAIL;
                ret.statusMessage = e.message;
            }
            return ret;
        }
    }
    /**
     * 这个是通过 get 方法调用请求
     * @param paramURL 请求的URL
     * @param {object} paramBody 要表求的消息
     * @param {object} paramOptions 请求选项
     * @param {object} paramHeaders 请求的headers信息
     * @returns {{error ?: object, statusCode ?: number, statusMessage ?: string, body ?: string, response ?: any}} 响应结果
     */
    public static async get(paramURL: string, paramBody: Record<string, string>, paramOptions = {}, paramheaders = {}) {
        let options = this.initOptions(paramOptions, EnumHttpMethod.get, paramheaders = {});
        options.searchParams = new URLSearchParams(paramBody);

        try {
            const r = (await got(paramURL, options)) as any;
            return {error: undefined, statusCode: r.statusCode, statusMessage: r.statusMessage, body: r.body, response: r.response};
        }catch(e) {
            let ret: IGotRequestReturn = { error: e };
            if (xmcommon.utils.isNotNull(e.response)) {
                ret.statusCode    = e.response.statusCode;
                ret.statusMessage = e.response.statusMessage;
                ret.response      = e.response;
            } else {
                ret.statusCode    = EnumGotUtilsError.FAIL;
                ret.statusMessage = e.message;
            }
            return ret;
        }
    }
}
