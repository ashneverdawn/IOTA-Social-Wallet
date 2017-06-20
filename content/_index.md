+++
date = "2017-06-17T14:56:39-04:00"
description = ""
title = "Home"
+++

<br>
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
    if(load('hash') === null) {
        get('create-pass').hidden = false
    } else {
        get('login').hidden = false
    }
    function createPass() {
        if( get('pass').value === "" ){
            console.log("enter a password")
            return
        }
        if(get('pass').value !== get('confirm').value) {
            console.log("passwords don't match")
            return
        } 
        if(get('pass').value === get('confirm').value) {
            save('hash', {hash : hash512(get('pass').value)})
            
            console.log('pass created!')
            redirectWithPass('./wallets', get('pass').value)
            /*
            var enc = encrypt(get('pass').value, "This is my message and it is not very long.")
            console.log(enc)
            var dec = decrypt(get('pass').value, enc)
            console.log(dec)
            */
        }
    }
    function login() {
        if (load('hash').hash !== hash512(get('login-pass').value)) {
            console.log('Incorrect password')
        } else {
            console.log('login success!')
            redirectWithPass('./wallets', get('login-pass').value)
        }
    }
    function clearData() {
        localStorage.clear()
        window.location.reload(false);
    }
</script>