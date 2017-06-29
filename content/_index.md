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


<script src="../js/index.js" defer></script>