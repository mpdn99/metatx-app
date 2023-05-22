import { Dropdown, Menu, Space } from "antd";
import { Header } from "antd/es/layout/layout";
import { Link } from "react-router-dom";

const navItem = [
    {
        key: 'mint',
        label: (
            <Link to="/mint">
                Mint NFT
            </Link>
        ),
    },
    {
        key: 'transfer',
        label: (
            <Link to="/transfer">
                Transfer NFT
            </Link>
        ),
    },
]

const logOut = () => {
    localStorage.removeItem("IDtoken");
    localStorage.removeItem("UserID");
    window.location.href = "/";
}

const items = [
    {
      key: '1',
      label: (
        <p onClick={logOut}>
            Sign Out
        </p>
      ),
    },
];

function HeaderView({ selectedPageKey }) {
  return (
    <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <Space>
        <h1 style={{ color: 'white', marginRight: '20px' }}>VAIX</h1>
        <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={[selectedPageKey]}
            items={navItem}
        />
    </Space>
        <Space wrap>
            <Dropdown menu={{ items }} placement="bottomRight">
                <p style={{ color: 'white'}}>
                    {localStorage.getItem("UserID")}
                </p>
            </Dropdown>
        </Space>
</Header>
   )
}

export default HeaderView;