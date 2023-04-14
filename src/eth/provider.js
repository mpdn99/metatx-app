import { JsonRpcProvider } from 'ethers';

const MAIN_ENDPOINT = 'https://nd-522-024-059.p2pify.com/a822bb7695d5aebc96b4288ad6b34fdb';

export function createProvider() {
  return new JsonRpcProvider(MAIN_ENDPOINT, 80001);
}