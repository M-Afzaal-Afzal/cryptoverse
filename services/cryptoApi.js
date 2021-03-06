import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoApiHeaders = {
    'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
    'x-rapidapi-key': '4b9222ae0amsh7db8b7abaca0c14p1cc330jsn58b47939f6ef'
}

const baseUrl = 'https://coinranking1.p.rapidapi.com';

const createRequest = (url) => ({
    url,
    headers: cryptoApiHeaders,
})

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder) => ({
        getCryptos: builder.query({
            query: (count) => createRequest(`/coins?limit=${count}`)
        }),
        getCryptoDetails: builder.query({
            query: (coinId => createRequest(`/coin/${coinId}`))
        }),
        getCryptoHistory: builder.query({
            query: (({coinId,timePeriod}) => createRequest(`/coin/${coinId}/history/${timePeriod}`))
        }),
        getExchanges: builder.query({
            query: (() => createRequest(`/exchanges`))
        }),
    }),
});

export const {useGetCryptosQuery,useGetCryptoDetailsQuery,useGetCryptoHistoryQuery,useGetExchangesQuery} = cryptoApi;

// const options = {
//     method: 'GET',
//     url: 'https://coinranking1.p.rapidapi.com/stats',
//     headers: {
//         'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
//         'x-rapidapi-key': '4b9222ae0amsh7db8b7abaca0c14p1cc330jsn58b47939f6ef'
//     }
// };