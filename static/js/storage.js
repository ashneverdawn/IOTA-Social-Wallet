"use strict"

var Storage = (function() {
    var pass = ""
    var key = "data"
    var Encryption = null

    var queryString = (function(a) {
        if (a == "") return {};
        var b = {};
        for (var i = 0; i < a.length; ++i)
        {
            var p=a[i].split('=', 2);
            if (p.length == 1)
                b[p[0]] = "";
            else
                b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
        }
        return b;
    })(window.location.search.substr(1).split('&'));

    function newData() {
        var data = {}
        data.hash = ""
        data.wallets = []
        data.contacts = []
        return data
    }

    function setPass(pwd) {
        if(pwd !== "") {
            pass = pwd
            var data = newData()
            data.hash = Encryption.hash512(pwd)
            save(data)
            localStorage["hash"] = data.hash
            return true
        } else {
            return false
        }
    }
    function auth(pwd) {
        pass = pwd
        var data = load()
        if(data.hash == Encryption.hash512(pwd)) {
            return true
        } else {
            return false
        }
    }
    function getPass() {
        return decodeURIComponent(queryString["param"])
    }
    function getData() {
        return decodeURIComponent(queryString["data"])
    }
    function init(enc) {
        Encryption = enc
        pass = getPass()
        if(typeof(pass) === "undefined" || pass === "" || pass === null) {
            return false
        } else {
            return true
        }
    }
    function save(obj) {
        var data = JSON.stringify(obj)
        data = Encryption.encrypt(pass, data)
        localStorage[key] = data
    }
    function load() { 
        try {
            var data = localStorage[key]
            data = Encryption.decrypt(pass, data)
            return JSON.parse(data)
        } catch(e) { 
            return newData()
        }  
    }

    return {
        getData: getData,
        getPass: getPass,
        setPass: setPass,
        auth: auth,
        init: init,
        save: save,
        load: load
    }
})()