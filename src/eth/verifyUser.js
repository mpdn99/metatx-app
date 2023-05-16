import { ethers, toNumber } from "ethers";

export async function verifierUser(vaixDemo, provider) {
  await window.ethereum.request({ method: 'eth_requestAccounts' });
  const userProvider = new ethers.BrowserProvider(window.ethereum)
  const userNetwork = await userProvider.getNetwork();
  if (toNumber(userNetwork.chainId) !== 137) throw new Error(`Please switch to Polygon Mainet for signing`);
  const signer = userProvider.getSigner();
  const input = "vaix"
  const signature = await (await signer).signMessage(input);
  localStorage.setItem("IDtoken", signature);
  localStorage.setItem("UserID", ethers.getAddress(await (await signer).getAddress()));
  return signature;
}