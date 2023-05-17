import { ethers, toNumber } from "ethers";

export async function verifierUser(vaixDemo, provider) {
  await window.ethereum.request({ method: 'eth_requestAccounts' });
  const userProvider = new ethers.BrowserProvider(window.ethereum)
  const userNetwork = await userProvider.getNetwork();
  if (toNumber(userNetwork.chainId) !== 137) throw new Error(`Please switch to Polygon Mainet for signing`);
  const signer = userProvider.getSigner();
  const input = `Welcome to VAIX Demo!\n\nClick sign to verify your identity.\n\nThis request will not trigger a blockchain transaction or cost any gas fees.\n\nURI:\nsolashinft.ducnghiapham.online\n\nWallet address:\n${await (await signer).getAddress()}\n\nChain ID:\n${userNetwork.chainId}`
  const signature = await (await signer).signMessage(input);
  localStorage.setItem("IDtoken", signature);
  localStorage.setItem("UserID", ethers.getAddress(await (await signer).getAddress()));
  return signature;
}