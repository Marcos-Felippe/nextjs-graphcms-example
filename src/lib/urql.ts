import { createClient, cacheExchange, dedupExchange, fetchExchange, ssrExchange } from 'urql';

const isServerSide = typeof window === 'undefined';
const ssrCache = ssrExchange({ isClient: !isServerSide });

// Criando um cliente urql para nossa api
const client = createClient({
    url: "sua url da api do graphcms",
    exchanges: [dedupExchange, cacheExchange, ssrCache, fetchExchange],
});

export {client, ssrCache };