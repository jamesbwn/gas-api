
const express = require("express");
require('dotenv').config()
const ethers = require('ethers');
const gasABI = require('./gas.json')

const WSS = "https://goerli.optimism.io/"
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
	var elements
	for (let i = 0; i < key.length; i++) {
		elements.push(key[i]);
	}
	gasContract.storeGas(elements);

	res.send("success")
})

