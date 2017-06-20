+++
date = "2017-06-17T15:04:12-04:00"
description = ""
title = "Wallets"
weight = 1
alwaysclosed = true
+++


<button onclick="genSeed()">Gen Seed</button>
<button onclick="genAddress()">Gen Address</button>

<form id='test' onsubmit='try{getBalance();}catch(e){}return false'>
    <br>
    <p>Enter your seed:</p>
    <input type='text' id='seed'>
    <input type='submit' value='Search'>
</form>

<script>
function genSeed() {
    get('seed').value = genRandomSeed()
}
function genAddress() {
    iota.api.getNewAddress(get('seed').value, {security: 3, total: 1, returnAll: true}, function(err, data) {
        console.log(err)
        console.log(data)
    })
}
function getBalance() {
    iota.api.getInputs(get('seed').value, function (err, data) {
        console.log(err)
        console.log(data)
    });
}
</script>