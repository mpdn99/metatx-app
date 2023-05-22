import React, { useEffect } from 'react';
import { Button, Form, Input, Layout, theme } from 'antd';
import './index.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createInstance } from '../../eth/customContract';
import { createProvider } from '../../eth/provider';
import { transfer } from '../../eth/transfer';
import ReCAPTCHA from 'react-google-recaptcha';
import { Content } from 'antd/es/layout/layout';
import HeaderView from '../../components/HeaderView';

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
    const captchaRef = React.useRef(null);
    const [loading, setLoading] = React.useState(false);

    const onFinish = async (values) => {
        setLoading(true);

        try {
            let token = await captchaRef.current.getValue();
            if (token) {
                const provider = createProvider()
                const vaixDemo = await createInstance(values.nftContractAddress, provider);
                const response = await transfer(vaixDemo, provider, values, token);
                const hash = response.hash;
                if (hash) {
                    toast('Transaction sent!', { type: 'success' });
                }
                formRef.current?.resetFields();
                captchaRef.current?.reset();
            } else {
                console.log("You must confirm you are not a robot");
            }
        } catch (error) {
            toast(`${error}`, { type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!localStorage.getItem("IDtoken")) {
            window.location.href = "/";
        }
    }, []);

    return (
        <Layout className="layout">
            <HeaderView selectedPageKey="transfer" />
            <Content style={{ padding: '0 50px' }}>
                <h1>Transfer NFT</h1>
                <div className="site-layout-content" style={{ background: colorBgContainer }}>
                    <Form
                        {...layout}
                        ref={formRef}
                        name="control-ref"
                        onFinish={onFinish}
                        style={{ maxWidth: 600 }}
                    >
                        <Form.Item name="nftContractAddress" label="NFT Contract Address" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="tokenId" label="Token Id" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="sendTokenTo" label="To" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            <ReCAPTCHA sitekey={process.env.REACT_APP_SITE_KEY} ref={captchaRef} />
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