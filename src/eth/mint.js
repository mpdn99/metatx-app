import { ethers, toNumber } from "ethers";
import { createInstance } from './forwarder';
import { signMetaTxRequest } from './signer';

async function sendMetaTx(vaixDemo, provider, signer, token) {
    // const url = process.env.REACT_APP_WEBHOOK_URL;
    // if (!url) throw new Error('Missing relayer url');

    const forwarder = createInstance(provider);
    const from = await (await signer).getAddress();
    const data = vaixDemo.interface.encodeFunctionData('mintTo(address)', [from]);
    const to = await vaixDemo.getAddress();
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

export async function mint(vaixDemo, provider, token) {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const userProvider = new ethers.BrowserProvider(window.ethereum)
    const userNetwork = await userProvider.getNetwork();
    if (toNumber(userNetwork.chainId) !== 137) throw new Error(`Please switch to Polygon Mainet for signing`);
    const signer = userProvider.getSigner();
    return sendMetaTx(vaixDemo, provider, signer, token);
}