"use strict"

var Util = (function(){
    function getById(id) {
        return document.getElementById(id)
    }
    function getByClass(id) {
        return document.getElementsByClassName(id)
    }
    function redirectWithParam(url, param) {
        var form = $('<form hidden=true action="' + url + '" method="get">' +
        '<input type="password" name="param" value="' + param + '" />' +
        '</form>');
        $('body').append(form);
        form.submit();
    }
    return {
        getById: getById,
        getByClass: getByClass,
        redirectWithParam: redirectWithParam
    }
})()