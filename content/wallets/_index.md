+++
date = "2017-06-17T15:04:12-04:00"
description = ""
title = "Wallets"
weight = 1
alwaysclosed = true
+++

<style>
#wallet-list th, td{
    padding:15px;
    padding-bottom: 40px;
    padding-top: 40px;
    border:none;
    border-bottom: 1px solid #CCCCCC;
}
</style>

<table id="wallet-list"></table>

<button onclick="addNewWallet()">Create New Wallet</button>

<br>
<p>Import a wallet: (Enter your seed)</p>
<input type='text' id='import-wallet'>
<button onclick="importWallet()">Import</button>

<script>
refreshWalletList()

function refreshWalletList() {
    Util.getById("wallet-list").innerHTML = ""
    var rows = []
    for(var i = 0; i < userData.wallets.length; i++) {
        rows.push(document.createElement('tr'))

        var name = document.createElement('td')
        var text = document.createElement("p")
        text.innerHTML = userData.wallets[i].name
        text.id = "wallet-name" + i
        name.appendChild(text)
        rows[i].appendChild(name)
        var button = document.createElement('button')
        button.appendChild(document.createTextNode("Rename"))
        name.appendChild(button)
        rows[i].appendChild(name)

        var balance = document.createElement('td')
        var text = document.createElement("p")
        text.innerHTML = "Balance"
        getBalance(userData.wallets[i].seed, text)
        text.id = "wallet-balance" + i
        balance.appendChild(text)
        rows[i].appendChild(balance)

        var button = document.createElement('button')
        button.appendChild(document.createTextNode("Receive"))
        balance.appendChild(button)
        rows[i].appendChild(balance)
        balance.appendChild(document.createTextNode(' '))
        var button = document.createElement('button')
        button.appendChild(document.createTextNode("Send"))
        balance.appendChild(button)
        rows[i].appendChild(balance)


        var backup = document.createElement('td')
        var button = document.createElement('button')
        button.appendChild(document.createTextNode("Delete"))
        backup.appendChild(button)
        var ln = document.createElement("br");
        backup.appendChild(ln);
        var ln = document.createElement("br");
        backup.appendChild(ln);
        var button = document.createElement('button')
        button.appendChild(document.createTextNode("Backup"))
        backup.appendChild(button)
        rows[i].appendChild(backup)


    }
    for(var i = 0; i < rows.length; i++)
        Util.getById("wallet-list").appendChild(rows[i])
}

function addNewWallet() {
    var wallet = {}
    wallet.name = "Wallet " + (userData.wallets.length)
    wallet.seed = IotaTools.genRandomSeed()
    userData.wallets.push(wallet)
    Storage.save(userData)
    refreshWalletList()
}
function importWallet() {

}
function getBalance(seed, text) {
    iota.api.getInputs(seed, function (err, data) {
        text.innerHTML = data.totalBalance
        console.log(err)
        console.log(data)
    });
}

function renameWallet() {

}
function receiveIota() {

}
function sendIota() {

}
function deleteWallet() {

}
function backupWallet() {

}







function genSeed() {
    var wallet = {}
    wallet.name = "Wallet " + (userData.wallets.length + 1)
    wallet.seed = IotaTools.genRandomSeed()
    userData.wallets.push(wallet)
    Storage.save(userData)
    Util.getById('seed').value = wallet.seed
    console.log(userData)
}
function genAddress() {
    iota.api.getNewAddress(Util.getById('seed').value, {security: 3, total: 1, returnAll: true}, function(err, data) {
        console.log(err)
        console.log(data)
    })
}
</script>