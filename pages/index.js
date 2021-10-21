import React, {useEffect} from 'react';
import millify from "millify";
import {Typography,Row,Col,Statistic} from "antd";
import Link from 'next/link';
import {useGetCryptosQuery} from "../services/cryptoApi";
import Cryptocurrencies from "./cryptocurrencies";
import News from "./news";
import Loader from "../components/Loader";

const {Title} = Typography;

const Homepage = () => {

    const {data,isFetching} = useGetCryptosQuery(100);

    const globalStats = data?.data?.stats;

    useEffect(() => {
        if (!isFetching) {
            console.log(data)
        }
    },[])

    if (isFetching) {
        return <Loader/>
    }

    return (
        <>
            <Title level={2} className={'heading'}>
                Global Crypto Stats
            </Title>
            <Row>
                <Col span={12}><Statistic title={'Total Cryptocurrencies'} value={globalStats?.total || 0}/></Col>
                <Col span={12}><Statistic title={'Total Exchanges'} value={millify(globalStats?.totalExchanges || 0)}/></Col>
                <Col span={12}><Statistic title={'Market Cap'} value={millify(globalStats?.totalMarketCap || 0)}/></Col>
                <Col span={12}><Statistic title={'Total 24th Volume'} value={millify(globalStats?.total24hVolume || 0)}/></Col>
                <Col span={12}><Statistic title={'Total Markets'} value={millify(globalStats?.totalMarkets || 0)}/></Col>
            </Row>
            <div className={'home-heading-container'}>
                <Title level={2} className={'home-title'}>Top 10 cryptocurrencies in the world</Title>
                <Title level={3} className={'show-more'}><Link href={'/cryptocurrencies'}>Show More</Link></Title>
            </div>
            <Cryptocurrencies simplified/>

            <div className={'home-heading-container'}>
                <Title level={2} className={'home-title'}>Latest Crypto News</Title>
                <Title level={3} className={'show-more'}><Link href={'/cryptocurrencies'}>Show More</Link></Title>
            </div>
            <News simplified/>
        </>
    );
};

export default Homepage;