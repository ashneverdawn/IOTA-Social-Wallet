
var alert = Util.getByClass("alert alert-danger")[0]
alert.setAttribute("hidden", true);


if(typeof(localStorage["hash"]) === "undefined") {
    Util.getById('create-pass').hidden = false
} else {
    Util.getById('login').hidden = false
}
function createPass() {
    if( Util.getById('pass').value === "" ){
        alert.innerHTML = "Enter a password"
        alert.hidden = false
        return
    }
    if(Util.getById('pass').value !== Util.getById('confirm').value) {
        alert.innerHTML = "Passwords don't match"
        alert.hidden = false
        return
    } 
    if(Util.getById('pass').value === Util.getById('confirm').value) {
        var hashedPass = Encryption.hash512(Util.getById('pass').value)
        Storage.setPass(hashedPass)
        alert.innerHTML = "Password created!"
        alert.hidden = false
        Util.redirectWithParam('./wallets', hashedPass)
    }
}
function login() {
    var hashedPass = Encryption.hash512(Util.getById('login-pass').value)
    if (!Storage.auth(hashedPass)) {
        alert.innerHTML = "Incorrect password"
        alert.hidden = false
    } else {
        alert.innerHTML = "Login success!"
        alert.hidden = false
        Util.redirectWithParam('./wallets', hashedPass)
    }
}
function clearData() {
    if(confirm("Are you sure? This will permanently erase all your data!")) {
        localStorage.clear()
        window.location.reload(false);
    }
}