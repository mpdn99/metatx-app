import { Contract } from 'ethers';

export function createInstance(nftContractAddress, provider) {
  const abi = async () => {
    const rs = await fetch(`https://api.polygonscan.com/api?module=contract&action=getabi&address=${nftContractAddress}&apikey=${process.env.REACT_APP_POLYGONSCAN_KEY}`)
    const res = await rs.json();
    return res;
  }
  return new Contract(nftContractAddress, abi, provider);
}
