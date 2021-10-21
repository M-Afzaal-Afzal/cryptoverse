import React, {useEffect, useState} from 'react';
import {useGetCryptoNewsQuery} from "../services/cryptoNewsApi";
import {Avatar, Card, Col, Row, Typography,Select} from "antd";
import moment from 'moment'
import {useGetCryptosQuery} from "../services/cryptoApi";
import Loader from "../components/Loader";

const News = ({simplified}) => {

    const [newsCategory,setNewsCategory] = useState('Cryptocurrency');

    const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

    const count = simplified ? 6 : 12;

    const {data: cryptoNews, isFetching} = useGetCryptoNewsQuery({newsCategory:newsCategory, count: count});
    const {data: cryptoCurrencies} = useGetCryptosQuery(100);

    console.log(cryptoNews, isFetching);

    useEffect(() => {
        if (!isFetching) {
            console.log(cryptoNews);
        }
    }, []);

    if (isFetching) {
        return <Loader/>
    }

    return (
        <Row gutter={['24','24']}>
            {!simplified && (
                <Col span={24}>
                    <Select
                        showSearch
                        className={'select-news'}
                        placeHolder={'Select a Crypto'}
                        optionFilterProp={'children'}
                        onChange={(value) => setNewsCategory(value) }
                        filterOption={(input,option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                        <Select.Option value={'Cryptocurrency'}>
                            Cryptocurrency
                        </Select.Option>
                        {
                            cryptoCurrencies?.data?.coins?.map((coin) => {
                                return (
                                    <Select.Option key={coin.id} value={coin.name}>
                                        {coin.name}
                                    </Select.Option>
                                )
                            })
                        }


                    </Select>
                </Col>
            )}
            {cryptoNews?.value.map((news,i) => {
                return (
                    <Col key={i} xs={24} sm={12} lg={8}>
                        <Card className={'news-card'} hoverable>
                            <a rel={'noreferrer'} target={'_blank'} href={news.url}>
                                <div className={'news-image-container'}>
                                    <Typography.Title level={4} className={'news-title'}>
                                        {news.name}
                                    </Typography.Title>
                                    <img style={{
                                        maxWidth: '200px',
                                        maxHeight: '100px',
                                    }} src={news?.image?.thumbnail?.contentUrl || demoImage} alt=""/>
                                </div>
                                <p>
                                    {
                                        news.description > 100 ?
                                            `${news.description.substr(0,100)}...`
                                            :
                                            `${news.description}`
                                    }
                                </p>
                                <div className={'provider-container'}>
                                    <div>
                                       <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage}/>
                                        <Typography.Text className={'provider-name'}>
                                            {news?.provider[0]?.name}
                                        </Typography.Text>
                                    </div>
                                        <Typography.Text>
                                            {moment(news.datePublished).startOf('ss').fromNow()}
                                        </Typography.Text>
                                </div>
                            </a>
                        </Card>
                    </Col>
                )
            })}
        </Row>
    );
};

export default News;