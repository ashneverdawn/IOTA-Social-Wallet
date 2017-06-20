function get(id) {
    return document.getElementById(id)
}
function hash512(pass) {
    var SHA512 = new Hashes.SHA512
    return SHA512.b64(pass)
}
function save(key, obj) {
    localStorage[key] = JSON.stringify(obj)
}
function load(key) {
    try { return JSON.parse(localStorage[key]) } 
    catch(e) { return null }
}
function encrypt(pass, data) {
    var hash = hash512(pass)
    key = hash.substring(0,32)

    var key_258_array = new Uint8Array(aesjs.utils.utf8.toBytes(key));
    var dataBytes = aesjs.utils.utf8.toBytes(data);
    var aesCtr = new aesjs.ModeOfOperation.ctr(key_258_array, new aesjs.Counter(5));

    var encryptedBytes = aesCtr.encrypt(dataBytes);
    var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
    return encryptedHex
}
function decrypt(pass, encryptedHex) {
    var hash = hash512(pass)
    key = hash.substring(0,32)

    var key_258_array = new Uint8Array(aesjs.utils.utf8.toBytes(key));
    var encryptedBytes = aesjs.utils.hex.toBytes(encryptedHex);
    var aesCtr = new aesjs.ModeOfOperation.ctr(key_258_array, new aesjs.Counter(5));

    var decryptedBytes = aesCtr.decrypt(encryptedBytes);
    var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
    return decryptedText
}
function encryptAndSave(pass, key, obj) {
    var data = JSON.stringify(obj)
    data = encrypt(pass, data)
    localStorage[key] = data
}
function loadAndDecrypt(pass, key) {
    try {
        var data = localStorage[key]
        data = decrypt(pass, data)
        return JSON.parse(data)
    } catch(e) { 
        return null 
    }
}
function loadPassTemp() {
    var passObj = load('pass')
    if(passObj != null) {
        var password = passObj.pass
        passObj.pass = null
        save('pass', passObj)
        return password
    }
    return null
}
function redirectWithPass(destination, pass) {
    save('pass', {pass : pass})
    window.location.replace(destination)
}
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