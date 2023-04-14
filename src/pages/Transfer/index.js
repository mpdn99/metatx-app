import React from 'react';
import { Button, Form, Input, Layout, Menu, theme } from 'antd';
import './index.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createInstance } from '../../eth/solashiNFT';
import { createProvider } from '../../eth/provider';
import { transfer } from '../../eth/transfer';
import { Link } from 'react-router-dom';

const { Header, Content } = Layout;

const navItem = [
    {
        key: '1',
        label: (
            <Link to="/">
                Mint NFT
            </Link>
        ),
    },
    {
        key: '2',
        label: (
            <Link to="/transfer">
                Transfer NFT
            </Link>
        ),
    },
]

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

const Transfer = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const formRef = React.useRef(null);
    const [loading, setLoading] = React.useState(false);


    const onFinish = async (values) => {
        setLoading(true);

        try {
            const provider = createProvider()
            const solashiNFT = createInstance(provider)
            const response = await transfer(solashiNFT, provider, values);
            const hash = response.hash;
            const onClick = hash
                ? () => window.open(`https://mumbai.polygonscan.com/tx/${hash}`)
                : undefined;
            toast('Transaction sent!', { type: 'success', onClick });
        } catch (error) {
            console.error(error);
            toast(`${error}`, { type: 'error' });
        } finally {
            formRef.current?.resetFields();
            setLoading(false);
        }
    };
    return (
        <Layout className="layout">
            <Header>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                    items={navItem}
                />
            </Header>
            <Content style={{ padding: '0 50px' }}>
                <div className="site-layout-content" style={{ background: colorBgContainer }}>
                    <h1>Transfer Solashi NFT</h1>
                    <Form
                        {...layout}
                        ref={formRef}
                        name="control-ref"
                        onFinish={onFinish}
                        style={{ maxWidth: 600 }}
                    >
                        <Form.Item name="sendTokenTo" label="To" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="tokenId" label="TokenId" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit" loading={loading}>
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Content>
            <ToastContainer />
        </Layout>
    );
};

export default Transfer;