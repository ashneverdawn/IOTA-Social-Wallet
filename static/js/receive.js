
getNewAddress()
function getNewAddress() {
    iota.api.getAccountData(userData.wallets[Storage.getData()].seed, function(err, data){
        console.log(err)
        if(!err) {
            console.log(data)
            Util.getById("address").value = data.latestAddress
            data = iota.utils.categorizeTransfers(data.transfers, data.addresses)
            console.log(data)
        }
    })
}

