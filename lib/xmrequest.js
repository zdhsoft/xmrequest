
const request = require('request');
const {utils} = require('xmcommon');
const {URLSearchParams} = require("url");
/**
 * 对Request方法的简单同步封装
 * 其它request方法，直接调用就可以了
 */
class RequestWapper {
	/**
	 * 同步请求get URL
	 * @param {string} paramURL 请求的URL
	 * @param {*} paramOptions 等同于request的options, 请参考其具体使用方法
	 * @return {{error:*, response:*, body:*}} 
	 */
	static async get(paramURL, paramOptions = {}) {
		let [error, response, body] = await utils.WaitClassFunctionEx(request, "get", paramURL, paramOptions);
		return {error, response, body};
	}
	/**
	 * 同步请求post URL
	 * @param {string} paramURL 请求的URL
	 * @param {*} paramOptions 等同于request的options, 请参考其具体使用方法
	 * @return {{error:*, response:*, body:*}} 
	 */
	static async post(paramURL, paramOptions = {}) {
		let [error, response, body] = await utils.WaitClassFunctionEx(request, "post", paramURL, paramOptions);
		return {error, response, body};
	}
 
	/**
	 * 同步请求del URL
	 * @param {string} paramURL 请求的URL
	 * @param {*} paramOptions 等同于request的options, 请参考其具体使用方法
	 * @return {{error:*, response:*, body:*}} 
	 */
	static async del(paramURL, paramOptions = {}) {
		let [error, response, body] = await utils.WaitClassFunctionEx(request, "del", paramURL, paramOptions);
		return {error, response, body};
	}
 
	/**
	 * 同步请求put URL
	 * @param {string} paramURL 请求的URL
	 * @param {*} paramOptions 等同于request的options, 请参考其具体使用方法
	 * @return {{error:*, response:*, body:*}} 
	 */
	static async put(paramURL, paramOptions = {}) {
		let [error, response, body] = await utils.WaitClassFunctionEx(request, "put", paramURL, paramOptions);
		return {error, response, body};
    }
	/**
	 * 同步请求head URL
	 * @param {string} paramURL 请求的URL
	 * @param {*} paramOptions 等同于request的options, 请参考其具体使用方法
	 * @return {{error:*, response:*, body:*}} 
	 */
	static async head(paramURL, paramOptions = {}) {
		let [error, response, body] = await utils.WaitClassFunctionEx(request, "head", paramURL, paramOptions);
		return {error, response, body};
    }   
	/**
	 * 同步请求delete URL
	 * @param {string} paramURL 请求的URL
	 * @param {*} paramOptions 等同于request的options, 请参考其具体使用方法
	 * @return {{error:*, response:*, body:*}} 
	 */
	static async delete(paramURL, paramOptions = {}) {
		let [error, response, body] = await utils.WaitClassFunctionEx(request, "delete", paramURL, paramOptions);
		return {error, response, body};
    }
    
    /**
	 * 同步请求patch URL
	 * @param {string} paramURL 请求的URL
	 * @param {*} paramOptions 等同于request的options, 请参考其具体使用方法
	 * @return {{error:*, response:*, body:*}} 
	 */
	static async patch(paramURL, paramOptions = {}) {
		let [error, response, body] = await utils.WaitClassFunctionEx(request, "patch", paramURL, paramOptions);
		return {error, response, body};
    }
}
/**
 * json请求及响应的封装
 */
class JsonRequest {
    /**
     * JSON返回统一处理
     * @param {{error:*, response:*, body:*}} paramRequestResturn 
     */
    static Return(paramRequestResturn) {        

    }
    /**
     * get的方式请求
     * @param {string} paramUri 
     * @param {object} params 
     */
    static async get(paramUri, params) {
        let p = '';
        if(utils.isObject(params)) {
            let urlParams = new URLSearchParams();
            for(let key in params) {
                urlParams.append(key, params[key]);
            }
            p = '?' + urlParams.toString();
        }
        return this.Return(await RequestWapper.get(paramUri + p));
    }
    static async post(paramUri, params) {
        
    }
};

exports.RequestWapper = RequestWapper;