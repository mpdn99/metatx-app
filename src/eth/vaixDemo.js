import { Contract } from 'ethers';
import deploy from '../deploy.json';
import VaixDemoAbi from '../abi/VaixDemo.json';

const abi = VaixDemoAbi.abi;

export function createInstance(provider) {
  return new Contract(deploy.VaixDemo, abi, provider);
}
