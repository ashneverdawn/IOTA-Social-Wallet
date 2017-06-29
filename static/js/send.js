function send() {
    var transfer = {}
    transfer.address = Util.getById("address").value
    transfer.value = parseInt(Util.getById("amount").value)
    //transfer.tag = '999999999999999999999999999'
    //transfer.message = '9'
    var transfers = []
    transfers.push(transfer)
    console.log("Sending '" + transfer.value + "' to '" + transfer.address + "'")

    var seed = userData.wallets[Storage.getData()].seed
    
    iota.api.sendTransfer(seed, 4, 16, transfers, function(err, data) {
        console.log('ok')
        console.log(err)
        console.log(data)
    })
    
}