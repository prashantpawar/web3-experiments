export const startApp = function startApp() {
  console.log("App started");
  var coinbase = web3.eth.coinbase;
  web3.eth.getBalance(coinbase, function (error, balance) {
    console.log(balance.toNumber());
  });
};
