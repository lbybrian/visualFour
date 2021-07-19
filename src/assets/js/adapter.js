import axios from 'axios';

let qs = require('qs')

let AxiosRequest = function(url, method, bodyType) {
    this.url = url;
    this.method = method;
    this.bodyType = bodyType;
    var _self = this;
    return function(query, callback) {
        var method = _self.method;
        var url = _self.url;
        var token = localStorage.getItem("token");

        var cTypeHeader = {
            'Content-Type': bodyType || "application/x-www-form-urlencoded; charset=utf-8",
            'token': token
        }


        if ((method === "get" || method === "delete") && query && !query._path) {
            let t = qs.stringify(query);
            url += "?" + t;
        } else if (query && query._path) {
            url += "/" + query._path;
            delete query._path;
            let t = qs.stringify(query);
            url += "?" + t;
        } else {

        }
        // if (token) {
        //     if (url.search(/\?/) === -1) {
        //         url += "?token=" + token;
        //     } else {
        //         url += "&token=" + token;
        //     }
        // }


        if (cTypeHeader['Content-Type'].search("application/x-www-form-urlencoded") !== -1) {
            query = qs.stringify(query);
        }

        var options = {
            headers: cTypeHeader,
        }
        axios[method](url, query, options).then(function(data) {
            if (data.data.status < 0) {
                location.href = "#/";
            }
            if (typeof(callback) === "function") {
                try {
                    if (typeof(data.data) === "string") {
                        data.data = JSON.parse(data.data);
                    }
                } catch (e) {
                    console.log(e)
                }
                callback(data);
            }
        })
    }
}


var Adapter = function(config) {
    this.config = config;
    this.list = [];
    for (let k in config) {
        var item = config[k];
        if (item.url && item.method) {
            this[k] = new AxiosRequest(item.url, item.method, item.bodyType);
        }
        this.list.push({
            label: config[k].name || "未命名接口",
            value: k,
            url: config[k].url,
            method: config[k].method
        })
    }
}


export default Adapter