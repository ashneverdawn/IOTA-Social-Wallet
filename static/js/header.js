
var iota = new IOTA({
    //'provider': 'http://service.iotasupport.com:14265'
    //'provider': 'http://iota.bitfinex.com:80'
    'provider' : 'http://lightserver1.iota.community:14600'
    //'provider' : 'http://lightserver2.iota.community:14600'
});

var init = Storage.init(Encryption)
if(window.location.pathname !== "/" && (init === false || Storage.auth(Storage.getPass()) === false)) {
    window.location.href = "../"
}
var userData = Storage.load()
console.log(userData)