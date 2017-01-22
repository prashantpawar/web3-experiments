import xs from 'xstream';
import web3 from 'web3';

export default function makeWeb3Driver() {
  function web3Driver() {
    return xs.create({
      start: listener => {
      }
    });
  }
}
