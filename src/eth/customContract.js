import { Contract } from 'ethers';

export async function createInstance(nftContractAddress, provider) {
  const abi = fetch(`https://api.polygonscan.com/api?module=contract&action=getabi&address=${nftContractAddress}&apikey=${process.env.REACT_APP_POLYGONSCAN_KEY}`)
    .then(res => res.json())
    .then(res => JSON.parse(res.result));
  console.log('abi ', abi);
  return new Contract(nftContractAddress, abi, provider);
}
