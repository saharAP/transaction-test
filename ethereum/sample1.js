var Web3 = require('web3');
const { default: Common, Chain, Hardfork } = require('@ethereumjs/common')
require('dotenv').config()   // Store environment-specific variable from '.env' to process.env

console.log("Sample1: send transaction using web3.js");
const provider = new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/'+process.env.INFURA_API_KEY); 
var web3 = new Web3(provider);

var accountAddress="0xc58cf9B50a32dB74CBd35c503B924753DEbc0e5A"; // sender address

  const rawTx = {
    //from:'0xc58cf9B50a32dB74CBd35c503B924753DEbc0e5A',
    gasPrice: 1000000000,
    gasLimit: 21000,
    to: '0x0000000000000000000000000000000000000000',
    value: 1,
  }

  web3.eth.getTransactionCount(accountAddress)
  .then(txCount => {
    rawTx.nonce = txCount; // set nonce for raw transaction

    var Tx = require('@ethereumjs/tx').Transaction;
    var privateKey = Buffer.from(process.env.PRIV_KEY, 'hex');
    const common = new Common({ chain: Chain.Ropsten})
 
    var tx = new Tx(rawTx,  {common});
    console.log("** Raw Transaction:\n")
    console.log(tx);
  
    const signedTx=tx.sign(privateKey);
    console.log("** Signed Transaction:\n")
    console.log(signedTx)
    const serializedTx = signedTx.serialize();
    web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
  .on('receipt', console.log);

})

