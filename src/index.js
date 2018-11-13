// import Bulma
require('./mystyles.scss');
// import web3
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io'));

// infura.ioより平均のGasPriceを取得
const getGasPrice = () => {
  return web3.eth.getGasPrice();
}

/*
https://coinmarketcap.com/ja/　よりETHの日本円を取得する
https://api.coinmarketcap.com/v2/ticker/1/?convert=EUR
*/
const getETHtoJPY = () => {
  const myRequest = new Request('https://api.coinmarketcap.com/v2/ticker/1027/?convert=JPY');
  return fetch(myRequest)
  .then(response => {
    if (response.status === 200) {
      return response.json();
    } else {
      throw new Error('Something went wrong on api server!');
    }
  })
  .then(response => {
    return response;
  }).catch(error => {
    return error;
  });
}

const setGasPrice = (gasPrice) => {
  const input = document.getElementById('gasPrice');
  input.value = gasPrice * 0.000000001;
}

const setEthPrice = (ethPrice) => {
  const input = document.getElementById('ethPrice');
  input.value = ethPrice;
}

const setPrice = (price) => {
  const input = document.getElementById('gasToJPY');
  input.value = price;
}

async function init(){
  const gasPrice = await getGasPrice();
  const ethData = await getETHtoJPY();
  const ethJPY = ethData.data.quotes.JPY.price;
  setGasPrice(gasPrice);
  setEthPrice(ethJPY);
}

init();
document.getElementById('gasUsed').addEventListener('change',(e) => {
  const gasUsed = e.target.value;
  const gasPrice = document.getElementById('gasPrice').value;
  const ethPrice = document.getElementById('ethPrice').value;
  const price = gasUsed * gasPrice * 0.000000001 * ethPrice;
  setPrice(price);
})





