"use strict"

var Util = (function(){
    function getById(id) {
        return document.getElementById(id)
    }
    function getByClass(id) {
        return document.getElementsByClassName(id)
    }
    function redirectWithParam(url, param, data) {
        param = encodeURIComponent(param)
        data = encodeURIComponent(data)
        window.location = url + "?param=" + param + "&data=" + data
    }
    return {
        getById: getById,
        getByClass: getByClass,
        redirectWithParam: redirectWithParam
    }
})()