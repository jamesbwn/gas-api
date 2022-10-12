
const express = require("express");
require('dotenv').config()
const ethers = require('ethers');
const gasABI = require('./gas.json')

const WSS = "https://goerli.infura.io/v3/ee6cfbccf40e427c9c1062066cb3a7b6"
var provider = new ethers.providers.JsonRpcProvider(WSS);

const gasAddress = '0x1896b6eC0D75198803Fc9877124C25D82f8f4A4b';
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
	var elements = []
	for (let i = 0; i < obKeys.length; i++) {
		elements.push(obKeys[i]);
	}
	gasContract.storeGas(elements);
	console.log('debug end')
	res.send("success")
})

app.get('/', async function (req, res) {
	res.send("test success")
})