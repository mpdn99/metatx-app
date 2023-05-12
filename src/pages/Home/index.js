import React from 'react';
import { Button, Layout } from 'antd';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createInstance } from '../../eth/solashiNFT';
import { createProvider } from '../../eth/provider';
import { useNavigate } from 'react-router-dom';
import { verifierUser } from '../../eth/verifyUser';

const { Header, Content } = Layout;

const Mint = () => {
  const navigate = useNavigate();
  const provider = createProvider()
  const solashiNFT = createInstance(provider)
  const handleClick = async () => {
    const signature = await verifierUser(solashiNFT, provider);
    if (signature) {
      navigate('/mint')
    } else {
      toast('Please connect wallet');
    }
  }
  return (
    <Layout className="layout">
      <Header style={{ display: "flex", justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ color: 'white' }}>VAIX</h1>
        <Button onClick={handleClick} >Connect Wallet</Button>
      </Header>
      <Content style={{ padding: '0 50px' }}>

      </Content>
      <ToastContainer />
    </Layout>
  );
};

export default Mint;