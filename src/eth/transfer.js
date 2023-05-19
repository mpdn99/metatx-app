import { ethers, toNumber } from "ethers";
import { createInstance } from './forwarder';
import { signMetaTxRequest } from './signer';

async function sendMetaTx(vaixDemo, provider, signer, input, token) {
    const { sendTokenTo, tokenId } = input;
    const forwarder = createInstance(provider);
    const from = await (await signer).getAddress();
    const data = vaixDemo.interface.encodeFunctionData('safeTransferFrom(address,address,uint256)', [from, sendTokenTo, tokenId]);
    console.log(data);
    const to = await vaixDemo.getAddress();
    const request = await signMetaTxRequest((await signer).provider, forwarder, { to, from, data });

    const IDtoken = localStorage.getItem("IDtoken");

    const body = {
        request,
        g_response: token,
    }

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

export async function transfer(vaixDemo, provider, input, token) {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const userProvider = new ethers.BrowserProvider(window.ethereum)
    const userNetwork = await userProvider.getNetwork();
    if (toNumber(userNetwork.chainId) !== 137) throw new Error(`Please switch to Polygon Mainet for signing`);
    const signer = userProvider.getSigner();
    return sendMetaTx(vaixDemo, provider, signer, input, token);
}