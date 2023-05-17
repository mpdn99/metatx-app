import { JsonRpcProvider } from 'ethers';

const MAIN_ENDPOINT = `https://polygon-mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_KEY}`;

export function createProvider() {
  return new JsonRpcProvider(MAIN_ENDPOINT, 137);
}