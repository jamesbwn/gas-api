
const express = require("express");
require('dotenv').config()
const ethers = require('ethers');
const gasABI = require('./gas.json')

const WSS = "https://goerli.infura.io/v3/ee6cfbccf40e427c9c1062066cb3a7b6"
var provider = new ethers.providers.JsonRpcProvider(WSS);

const gasAddress = '0xace08b9938aCAEb8B33C0F6d27e6C1189e775e4e';
const mine = process.env.privatekey

let wallet = new ethers.Wallet(mine, provider);

const gasContract = new ethers.Contract(
	gasAddress,
	gasABI,
	wallet
)

const port = 3000;


const app = express();

app.listen(process.env.PORT || 3000, () => {
	console.log(`App start on port ${port}`);
});
  

app.get('/estimateGas', async function (req, res) {
	const key = req.query.gas;
	const obKeys = JSON.parse(key)
	console.log('debug key', key, obKeys)
	var elements = []
	for (let i = 0; i < obKeys.length; i++) {
		elements.push(obKeys[i]);
	}
	console.log('debug ele', elements)
	gasContract.storeGas(elements);
	console.log('debug end')
	res.send("success")
})

app.get('/', async function (req, res) {
	res.send("test success")
})