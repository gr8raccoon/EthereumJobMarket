import Web3 from 'web3';

let web3;

const getProvider = async () => {
  await window.web3.currentProvider.enable();
};

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
  getProvider();
  web3 = new Web3(window.web3.currentProvider);

} else {
  const provider = new Web3.providers.HttpProvider(
    'https://rinkeby.infura.io/v3/0db8c2cd72e34cb5aef4ada4820352b2'
  );
  web3 = new Web3(provider);
}

export default web3;
