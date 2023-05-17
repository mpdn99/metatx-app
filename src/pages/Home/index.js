import React from 'react';
import { Button, Layout } from 'antd';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createInstance } from '../../eth/vaixDemo';
import { createProvider } from '../../eth/provider';
import { useNavigate } from 'react-router-dom';
import { verifierUser } from '../../eth/verifyUser';

const { Header, Content } = Layout;

const Mint = () => {
  const navigate = useNavigate();
  const provider = createProvider()
  const vaixDemo = createInstance(provider)
  const handleClick = async () => {
    try {
      const signature = await verifierUser(vaixDemo, provider);
      if (signature) {
        navigate('/mint')
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  return (
    <Layout className="layout">
      <Header style={{ display: "flex", justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ color: 'white' }}>VAIX Demo</h1>
        <Button onClick={handleClick} >Connect Wallet</Button>
      </Header>
      <Content style={{ padding: '0 50px' }}>

      </Content>
      <ToastContainer />
    </Layout>
  );
};

export default Mint;