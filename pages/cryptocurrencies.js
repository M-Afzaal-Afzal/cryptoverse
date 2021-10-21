import React, {useEffect, useState} from 'react';
import millify from "millify";
import Link from 'next/link';
import {useGetCryptosQuery} from "../services/cryptoApi";
import {Card, Row, Col, Input} from "antd";
import Loader from "../components/Loader";

const Cryptocurrencies = ({simplified}) => {

    const count = simplified ? 10 : 100;

    const {data: cryptosList, isFetching} = useGetCryptosQuery(count);
    const [cryptos, setCryptos] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (!isFetching) {
            const filteredData = cryptosList?.data?.coins.filter((coin) => coin.name.toLowerCase().includes(searchTerm.toLowerCase()))
            setCryptos(filteredData);
        }


    }, [cryptosList, searchTerm]);

    if (isFetching) {
        return <Loader/>
    }

    const searchHandler = (e) => {
        setSearchTerm(e.target.value)
    }

    return (
        <>
            {
                !simplified && (
                    <div className={'search-crypto'}>
                        <Input onChange={searchHandler} placeholder={'Search Cryptocurrency'}/>
                    </div>
                )
            }

            <Row gutter={[32, 32]} className={'crypto-card-container'}>
                {
                    !isFetching && cryptos.map(currency => {
                        return (
                            <Col xs={24} sm={12} lg={6} className={'crypto-card'} key={currency.id}>
                                <Link href={`/crypto/${currency.id}`}>
                                    <Card
                                        title={`${currency.rank} ${currency.name}`}
                                        extra={<img className={'crypto-image'}
                                                    src={currency.iconUrl} alt=""/>}
                                        hoverable
                                    >
                                        <p>Price: {millify(currency.price)}</p>
                                        <p>Market Cap: {millify(currency.marketCap)}</p>
                                        <p>Price: {millify(currency.change)}%</p>

                                    </Card>
                                </Link>
                            </Col>
                        )
                    })
                }
            </Row>
        </>
    );
};

export default Cryptocurrencies;