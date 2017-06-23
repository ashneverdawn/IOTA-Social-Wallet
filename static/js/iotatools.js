"use strict"
var IotaTools = (function () {

    function genRandomSeed() {
        var seed = ""
        for(var i = 0; i < 81; i++){
            var x = Math.floor((Math.random() * 27) + 1);

            var res
            if(x == 27) { 
                res = '9'
            } else { 
                res = String.fromCharCode(64 + x)
            }

            seed += res
        }
        return seed
    }   

    return {
        genRandomSeed: genRandomSeed
    }
})()