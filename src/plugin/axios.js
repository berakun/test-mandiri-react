import axios from "axios";

export const api = axios.create({
    baseURL: 'https://api.coinpaprika.com/v1/coins/',
    timeout: 1000
    // headers: {
    //   Authorization: `Bearer FeUOw1LkQVnbXrZ8LozPtwVlumXI8ABfANNZfJaVBWg3_tPdzw`
    // }
});