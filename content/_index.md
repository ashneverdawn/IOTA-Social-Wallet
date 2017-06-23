+++
date = "2017-06-17T14:56:39-04:00"
description = ""
title = "Home"
+++

<br>
{{% alert theme="danger" %}}{{% /alert %}}

<form id='create-pass' hidden=true onsubmit='try{createPass();}catch(e){}return false'>
    <p>
        Welcome, new user!<br>
        First, create a password to encrypt your local data:<br>
    </p><br>
    Password:<br>
    <input type='password' id='pass'>
    Repeat password:<br>
    <input type='password' id='confirm'>
    <input type='submit'>
</form>

<form id='login' hidden=true onsubmit='try{login();}catch(e){}return false'>
    <p>
        Welcome!<br>
        Enter your password to access your local data:<br>
    </p><br>
    Password:<br>
    <input type='password' id='login-pass'>
    <input type='submit'>
</form>

<form id='reset' onsubmit='try{clearData();}catch(e){}return false'>
    <br><br>
    <p>Clear your local data:</p>
    <input type='submit' value='Clear'>
</form>

<script>
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
            Storage.setPass(Util.getById('pass').value)
            alert.innerHTML = "Password created!"
            alert.hidden = false
            Util.redirectWithParam('./wallets', Util.getById('pass').value)
        }
    }
    function login() {
        if (!Storage.auth(Util.getById('login-pass').value)) {
            alert.innerHTML = "Incorrect password"
            alert.hidden = false
        } else {
            alert.innerHTML = "Login success!"
            alert.hidden = false
            Util.redirectWithParam('./wallets', Util.getById('login-pass').value)
        }
    }
    function clearData() {
        if(confirm("Are you sure? This will permanently erase all your data!")) {
            localStorage.clear()
            window.location.reload(false);
        }
    }
</script>