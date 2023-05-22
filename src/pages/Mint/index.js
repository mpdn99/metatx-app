import React, { useEffect } from 'react';
import { Button, Form, Image, Layout, theme } from 'antd';
import './index.css';
import { toast, ToastContainer } from 'react-toastify';
import { mint } from "../../eth/mint";
import 'react-toastify/dist/ReactToastify.css';
import { createInstance } from '../../eth/vaixDemo';
import { createProvider } from '../../eth/provider';
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

const Mint = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const captchaRef = React.useRef(null);
    const [loading, setLoading] = React.useState(false);

    const onFinish = async () => {
        setLoading(true);

        try {
            let token = await captchaRef.current.getValue();
            if (token) {
                    const provider = createProvider()
                    const vaixDemo = createInstance(provider)
                const response = await mint(vaixDemo, provider, token);
                const hash = response.hash;
                    if (hash) {
                        toast('Transaction sent!', { type: 'success' });
                        window.open(`https://polygonscan.com/tx/${hash}`, '_blank');
                    }
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
            <HeaderView selectedPageKey="mint" />
            <Content style={{ padding: '0 50px' }}>
                <h1>Mint NFT</h1>
                <div className="site-layout-content" style={{ background: colorBgContainer }}>
                    <Form
                        {...layout}
                        name="control-ref"
                        onFinish={onFinish}
                        style={{ maxWidth: 600 }}
                    >
                        <Form.Item {...tailLayout}>
                            <h3>VAIX NFT:</h3>
                            <Image width={250} src={require('../../assets/dog.gif')} />
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            <ReCAPTCHA sitekey={process.env.REACT_APP_SITE_KEY} ref={captchaRef} />
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit" loading={loading}>
                                Mint NFT
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Content>
            <ToastContainer />
        </Layout>
    );
};

export default Mint;