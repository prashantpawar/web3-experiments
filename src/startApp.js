import xs from 'xstream';
import { run } from '@cycle/xstream-run';
import { makeDOMDriver } from '@cycle/dom';
import R from 'ramda';

function main(sources) {
  const sinks = {DOM: null};
  /**
  var coinbase = web3.eth.coinbase;
  web3.eth.getBalance(coinbase, function (error, balance) {
    console.log(balance.toNumber());
  });
  **/
  console.log("App started");
  return sinks;
}

export const startApp = function startApp() {
  run(main, {
    DOM: makeDOMDriver('#app')
  });
}
