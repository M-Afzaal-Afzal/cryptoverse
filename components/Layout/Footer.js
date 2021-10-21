import React from 'react';
import {Space, Typography} from "antd";
import Link from 'next/link';

const { Title } = Typography;

const Footer = () => {
    return (
        <>
            <Title level={5} style={{
                color: "#fff",
                textAlign: 'center',
            }}>
                Cryptoverse <br/>
                All rights are reserved
            </Title>
            <Space>
                <Link href={'/'}>Home</Link>
                <Link href={'/exchanges'}>Exchanges</Link>
                <Link href={'/news'}>News</Link>
            </Space>

        </>

    );
};

export default Footer;