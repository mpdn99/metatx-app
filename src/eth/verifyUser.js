import { ethers, toNumber } from "ethers";

export async function verifierUser(solashiNFT, provider) {
  await window.ethereum.request({ method: 'eth_requestAccounts' });
  const userProvider = new ethers.BrowserProvider(window.ethereum)
  const userNetwork = await userProvider.getNetwork();
  if (toNumber(userNetwork.chainId) !== 80001) throw new Error(`Please switch to Mumbai for signing`);
  const signer = userProvider.getSigner();
  const input = "vaix"
  const signature = await (await signer).signMessage(input);
  localStorage.setItem("IDtoken", signature);
  localStorage.setItem("UserID", ethers.getAddress(await (await signer).getAddress()));
  return signature;
}