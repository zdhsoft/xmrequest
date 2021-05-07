"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GotUtils = exports.EnumGotUtilsError = exports.EnumHttpMethod = void 0;
const got_1 = __importDefault(require("got"));
const xmcommon_1 = __importDefault(require("xmcommon"));
const lodash_1 = __importDefault(require("lodash"));
/** HTTP的方法 */
var EnumHttpMethod;
(function (EnumHttpMethod) {
    EnumHttpMethod["get"] = "GET";
    EnumHttpMethod["post"] = "POST";
    EnumHttpMethod["put"] = "PUT";
    EnumHttpMethod["patch"] = "PATCH";
    EnumHttpMethod["head"] = "HEAD";
    EnumHttpMethod["delete"] = "DELETE";
    EnumHttpMethod["options"] = "OPTIONS";
    EnumHttpMethod["trace"] = "TRACE";
})(EnumHttpMethod = exports.EnumHttpMethod || (exports.EnumHttpMethod = {}));
/** 成功失败的错误码 */
var EnumGotUtilsError;
(function (EnumGotUtilsError) {
    EnumGotUtilsError[EnumGotUtilsError["OK"] = 0] = "OK";
    EnumGotUtilsError[EnumGotUtilsError["FAIL"] = -1] = "FAIL";
})(EnumGotUtilsError = exports.EnumGotUtilsError || (exports.EnumGotUtilsError = {}));
/**
 * GotUtils说明
 * - 由于request已经停止更新，并且已经标记为deprecated了，为了未来的使用考虑，所以使用got代替request, 实现了这个类
 * - 处理的结果与RequestUtils一样
 */
class GotUtils {
    /**
     * 初始化选项
     * - 这里会增加一个user-agent的header选项
     * @param paramOptions 默认传入的选项
     * @param paramMethod 要设置的方法 @see EnumHttpMethod
     * @param paramheaders http的header选项
     * @return 返回初始化的options
     */
    static initOptions(paramOptions, paramMethod, paramheaders) {
        if (xmcommon_1.default.utils.isNull(paramOptions)) {
            paramOptions = {};
        }
        if (!xmcommon_1.default.utils.isObject(paramOptions)) {
            paramOptions = {};
        }
        if (xmcommon_1.default.utils.isNull(paramheaders)) {
            paramheaders = {};
        }
        if (!xmcommon_1.default.utils.isObject(paramheaders)) {
            paramheaders = {};
        }
        let options = lodash_1.default.clone(paramOptions);
        options.headers = lodash_1.default.clone(paramheaders);
        options.method = paramMethod;
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
    static post(paramURL, paramBody, paramOptions = {}, paramheaders = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            let options = this.initOptions(paramOptions, EnumHttpMethod.post, paramheaders);
            options.form = paramBody;
            try {
                // 实际上，这里返回的是CancelableRequest<Response<string>>;
                // 但是用它的时候，访问statusCode，会被提示要加await，实际是这个是没有的
                const r = (yield got_1.default(paramURL, options));
                return { error: undefined, statusCode: r.statusCode, statusMessage: r.statusMessage, body: r.body, response: r.response };
            }
            catch (e) {
                let ret = { error: e };
                if (xmcommon_1.default.utils.isNotNull(e.response)) {
                    ret.statusCode = e.response.statusCode;
                    ret.statusMessage = e.response.statusMessage;
                    ret.response = e.response;
                }
                else {
                    ret.statusCode = EnumGotUtilsError.FAIL;
                    ret.statusMessage = e.message;
                }
                return ret;
            }
        });
    }
    /**
     * 这个是通过 application/x-www-form-urlencoded 方式上传参数
     * @param paramURL 请求的URL
     * @param paramBody 要表求的消息
     * @param paramOptions 请求选项
     * @param paramHeaders 请求的headers信息
     * @returns 响应结果
     */
    static jsonPost(paramURL, paramBody, paramOptions = {}, paramheaders = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            let options = this.initOptions(paramOptions, EnumHttpMethod.post, paramheaders);
            options.json = paramBody;
            try {
                const r = (yield got_1.default(paramURL, options));
                return { error: undefined, statusCode: r.statusCode, statusMessage: r.statusMessage, body: r.body, response: r.response };
            }
            catch (e) {
                let ret = { error: e };
                if (xmcommon_1.default.utils.isNotNull(e.response)) {
                    ret.statusCode = e.response.statusCode;
                    ret.statusMessage = e.response.statusMessage;
                    ret.response = e.response;
                }
                else {
                    ret.statusCode = EnumGotUtilsError.FAIL;
                    ret.statusMessage = e.message;
                }
                return ret;
            }
        });
    }
    /**
     * 这个是通过 get 方法调用请求
     * @param paramURL 请求的URL
     * @param {object} paramBody 要表求的消息
     * @param {object} paramOptions 请求选项
     * @param {object} paramHeaders 请求的headers信息
     * @returns {{error ?: object, statusCode ?: number, statusMessage ?: string, body ?: string, response ?: any}} 响应结果
     */
    static get(paramURL, paramBody, paramOptions = {}, paramheaders = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            let options = this.initOptions(paramOptions, EnumHttpMethod.get, paramheaders = {});
            options.searchParams = new URLSearchParams(paramBody);
            try {
                const r = (yield got_1.default(paramURL, options));
                return { error: undefined, statusCode: r.statusCode, statusMessage: r.statusMessage, body: r.body, response: r.response };
            }
            catch (e) {
                let ret = { error: e };
                if (xmcommon_1.default.utils.isNotNull(e.response)) {
                    ret.statusCode = e.response.statusCode;
                    ret.statusMessage = e.response.statusMessage;
                    ret.response = e.response;
                }
                else {
                    ret.statusCode = EnumGotUtilsError.FAIL;
                    ret.statusMessage = e.message;
                }
                return ret;
            }
        });
    }
}
exports.GotUtils = GotUtils;
