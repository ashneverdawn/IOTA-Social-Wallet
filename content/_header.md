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

<script>
var iota = new IOTA({
    'provider': 'http://service.iotasupport.com:14265'
    //'provider': 'http://iota.bitfinex.com:80'
});
//console.log(JSON.stringify(iota))

var password = loadPassTemp()

</script>