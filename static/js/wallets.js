"use strict"
refreshWalletList()

function refreshWalletList() {
    Util.getById("wallet-list").innerHTML = ""
    var doc = document
    var button, text, ln, name, balance, backup
    var walletList = Util.getById("wallet-list")
    for(var i = 0; i < userData.wallets.length; i++) {
        var row = doc.createElement('tr')

        name = doc.createElement('td')
        text = doc.createElement("input")
        text.setAttribute("size", "6")
        text.setAttribute("value", userData.wallets[i].name)
        text.setAttribute("disabled", "disabled")
        text.innerHTML = userData.wallets[i].name
        text.id = "wallet-name" + i
        name.appendChild(text)
        row.appendChild(name)
        ln = doc.createElement("br");
        name.appendChild(ln);
        button = doc.createElement('button')
        button.setAttribute("onclick", "renameWallet("+i+")")
        button.id = "wallet-rename-button" + i
        button.appendChild(doc.createTextNode("Rename"))
        name.appendChild(button)
        row.appendChild(name)

        balance = doc.createElement('td')
        text = doc.createElement("div")
        text.innerHTML = "Balance"
        getBalance(userData.wallets[i].seed, text)
        text.id = "wallet-balance" + i
        balance.appendChild(text)
        ln = doc.createElement("br");
        balance.appendChild(ln);
        button = doc.createElement('button')
        button.appendChild(doc.createTextNode("Send"))
        button.setAttribute("onclick", "sendIota("+i+")")
        balance.appendChild(button)
        balance.appendChild(doc.createTextNode(' '))
        button = doc.createElement('button')
        button.appendChild(doc.createTextNode("Receive"))
        button.setAttribute("onclick", "receiveIota("+i+")")
        balance.appendChild(button)
        row.appendChild(balance)

        backup = doc.createElement('td')
        button = doc.createElement('button')
        button.appendChild(doc.createTextNode("Delete"))
        button.setAttribute("onclick", "deleteWallet("+i+")")
        backup.appendChild(button)
        ln = doc.createElement("br");
        backup.appendChild(ln);
        ln = doc.createElement("br");
        backup.appendChild(ln);
        button = doc.createElement('button')
        button.appendChild(doc.createTextNode("Backup"))
        button.setAttribute("onclick", "backupWallet("+i+")")
        backup.appendChild(button)
        row.appendChild(backup)

        walletList.appendChild(row)
    }
}

function addNewWallet() {
    var wallet = {}
    wallet.name = "Wallet " + (userData.wallets.length)
    wallet.seed = IotaTools.genRandomSeed()
    userData.wallets.push(wallet)
    Storage.save(userData)
    backupWallet(userData.wallets.length-1)
    refreshWalletList()
}
function importWallet() {
    var wallet = {}
    wallet.name = "Wallet " + (userData.wallets.length)
    wallet.seed = Util.getById("import-wallet").value
    userData.wallets.push(wallet)
    Storage.save(userData)
    refreshWalletList()
}
function getBalance(seed, text) {
    iota.api.getInputs(seed, function (err, data) {
        if(!err) {
            text.innerHTML = data.totalBalance + 'i'
        }
        console.log(err)
        console.log(data)
    });
}

function renameWallet(index) {
    var walletLabel = Util.getById("wallet-name" + index)
    var walletButton = Util.getById("wallet-rename-button" + index)
    console.log(walletLabel.disabled)
    if(walletLabel.disabled) {
        walletLabel.disabled = false
        walletLabel.setSelectionRange(0, walletLabel.value.length)
        walletButton.innerHTML = "Save"
    } else {
        walletLabel.disabled = true
        walletButton.innerHTML = "Rename"
        userData.wallets[index].name = walletLabel.value
        Storage.save(userData)
    }
}
function sendIota(index) {
    Util.redirectWithParam('../send', Storage.getPass(), index)
}
function receiveIota(index) {
    Util.redirectWithParam('../receive', Storage.getPass(), index)
}
function deleteWallet(index) {
    var name = userData.wallets[index].name
    if(confirm("Are you sure you wish to remove '" + name + "'?")) {
        backupWallet(index)
        userData.wallets.splice(index, 1)
        Storage.save(userData)
        refreshWalletList()
    }

}
function backupWallet(index) {
    var name = userData.wallets[index].name
    var seed = userData.wallets[index].seed
    alert("Copy your seed for '" + name + "' to a safe location!\n\n" + seed)
}