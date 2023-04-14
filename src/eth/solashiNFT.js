import { Contract } from 'ethers';
import deploy from '../deploy.json';
import SolashiNFTAbi from '../abi/SolashiNFT.json';

const abi = SolashiNFTAbi.abi;

export function createInstance(provider) {
  return new Contract(deploy.SolashiNFT, abi, provider);
}
