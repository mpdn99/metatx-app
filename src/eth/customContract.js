import { Contract } from 'ethers';

export async function createInstance(nftContractAddress, provider) {
  const abi = fetch(`https://api.polygonscan.com/api?module=contract&action=getabi&address=${nftContractAddress}&apikey=${process.env.REACT_APP_POLYGONSCAN_KEY}`)
    .then(res => JSON.parse(res.result));
  console.log('Polygonscan ', process.env.REACT_APP_POLYGONSCAN_KEY);
  console.log('abi ', abi);
  console.log('nftContractAddress ', nftContractAddress);
  return new Contract(nftContractAddress, abi, provider);
}
