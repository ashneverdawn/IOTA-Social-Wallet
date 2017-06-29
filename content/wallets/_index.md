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

<script src="../js/wallets.js" defer></script>