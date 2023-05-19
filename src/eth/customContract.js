import { Contract } from 'ethers';

export async function createInstance(nftContractAddress, provider) {
  const abi = async () => {
    const rs = await fetch(`https://api.polygonscan.com/api?module=contract&action=getabi&address=${nftContractAddress}&apikey=${process.env.REACT_APP_POLYGONSCAN_KEY}`)
    const res = await rs.result.json();
    console.log('res ', res);
    return res;
  }
  console.log('abi ', abi);
  console.log('nftContractAddress ', nftContractAddress);
  return new Contract(nftContractAddress, abi, provider);
}
