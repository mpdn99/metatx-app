import { ethers, toNumber } from "ethers";
import { createInstance } from './forwarder';
import { signMetaTxRequest } from './signer';

async function sendMetaTx(solashiNFT, provider, signer, input, token) {
    const { sendTokenTo, tokenId, tokenUrl } = input;
    console.log(`Sending meta-tx mint NFT to ${sendTokenTo}...`);
    const url = process.env.REACT_APP_WEBHOOK_URL;
    if (!url) throw new Error('Missing relayer url');

    const forwarder = createInstance(provider);
    const from = await (await signer).getAddress();
    const data = solashiNFT.interface.encodeFunctionData('mint', [sendTokenTo, tokenId, tokenUrl]);
    const to = await solashiNFT.getAddress();
    const request = await signMetaTxRequest((await signer).provider, forwarder, { to, from, data });

    const body = {
        request,
        g_response: token,
    }

    const IDtoken = localStorage.getItem("IDtoken");

    const rs = await fetch(`https://api.ducnghiapham.online/relayer`,{
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
            'signature': IDtoken,
        },
    });

    const res = await rs.json();
    return res;
}

export async function mint(solashiNFT, provider, input, token) {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const userProvider = new ethers.BrowserProvider(window.ethereum)
    const userNetwork = await userProvider.getNetwork();
    if (toNumber(userNetwork.chainId) !== 80001) throw new Error(`Please switch to Mumbai for signing`);
    const signer = userProvider.getSigner();
    return sendMetaTx(solashiNFT, provider, signer, input, token);
}