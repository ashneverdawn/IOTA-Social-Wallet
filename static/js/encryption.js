"use strict"

var Encryption = (function() {

    function hash512(pass) {
        var SHA512 = new Hashes.SHA512
        return SHA512.b64(pass)
    }
    function encrypt(pass, data) {
        var hash = hash512(pass)
        var key = hash.substring(0,32)

        var key_258_array = new Uint8Array(aesjs.utils.utf8.toBytes(key));
        var dataBytes = aesjs.utils.utf8.toBytes(data);
        var aesCtr = new aesjs.ModeOfOperation.ctr(key_258_array, new aesjs.Counter(5));

        var encryptedBytes = aesCtr.encrypt(dataBytes);
        var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
        return encryptedHex
    }
    function decrypt(pass, encryptedHex) {
        var hash = hash512(pass)
        var key = hash.substring(0,32)

        var key_258_array = new Uint8Array(aesjs.utils.utf8.toBytes(key));
        var encryptedBytes = aesjs.utils.hex.toBytes(encryptedHex);
        var aesCtr = new aesjs.ModeOfOperation.ctr(key_258_array, new aesjs.Counter(5));

        var decryptedBytes = aesCtr.decrypt(encryptedBytes);
        var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
        return decryptedText
    }

    return {
        hash512: hash512,
        encrypt: encrypt,
        decrypt: decrypt
    }
})()