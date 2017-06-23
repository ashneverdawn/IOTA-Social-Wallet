+++
date = "2017-06-17T15:17:07-04:00"
description = ""
title = "Header"

+++
<img src="../img/iota_logo_white.png" alt="IOTA">
<script src="../js/iota.min.js"></script>
<script src="../js/util.js"></script>
<script src="../js/hashes.min.js"></script>
<script src="../js/aes.js"></script>
<script src="../js/storage.js"></script>
<script src="../js/encryption.js"></script>
<script src="../js/iotatools.js"></script>

<script>
document.body.style.backgroundColor = "#DDFFFF";
var iota = new IOTA({
    'provider': 'http://service.iotasupport.com:14265'
    //'provider': 'http://iota.bitfinex.com:80'
});

var init = Storage.init(Encryption)
if(window.location.pathname !== "/" && (init === false || Storage.auth(Storage.getPass()) === false)) {
    window.location.href = "../"
}
var userData = Storage.load()
console.log(userData)
</script>