import { toNumber } from 'ethers';


const EIP712Domain = [
  { name: 'name', type: 'string' },
  { name: 'version', type: 'string' },
  { name: 'chainId', type: 'uint256' },
  { name: 'verifyingContract', type: 'address' }
];

const ForwardRequest = [
  { name: 'from', type: 'address' },
  { name: 'to', type: 'address' },
  { name: 'value', type: 'uint256' },
  { name: 'gas', type: 'uint256' },
  { name: 'nonce', type: 'uint256' },
  { name: 'data', type: 'bytes' },
];

function getMetaTxTypeData(chainId, verifyingContract) {
  return {
    types: {
      EIP712Domain,
      ForwardRequest,
    },
    domain: {
      name: 'MinimalForwarder',
      version: '0.0.1',
      chainId,
      verifyingContract,
    },
    primaryType: 'ForwardRequest',
  }
};

async function signTypedData(signer, from, data) {
  const dataStr = JSON.stringify(data, (_, value) => {
    return (typeof value === 'bigint') ? toNumber(value) : value;
  });

  const isHardhat = data.domain.chainId === 31337;
  const [method, argData] = isHardhat
    ? ['eth_signTypedData', data]
    : ['eth_signTypedData_v4', dataStr]
  return await signer.send(method, [from, argData]);
}

async function buildRequest(forwarder, input) {
  const nonce = await forwarder.getNonce(input.from).then(nonce => nonce.toString());
  const gas = await forwarder.runner.provider.estimateGas(input).then(gasLimit => (gasLimit).toString());
  return { value: 0, gas, nonce, ...input};
}

async function buildTypedData(forwarder, request) {
  const chainId = await forwarder.runner.provider.getNetwork().then(n => n.chainId);
  const typeData = getMetaTxTypeData(chainId, await forwarder.getAddress());
  return { ...typeData, message: request };
}

async function signMetaTxRequest(signer, forwarder, input) {
  const request = await buildRequest(forwarder, input);
  const toSign = await buildTypedData(forwarder, request);
  const signature = await signTypedData(signer, input.from, toSign);
  return { signature, request };
}

export {
  signMetaTxRequest,
  buildRequest,
  buildTypedData,
}
