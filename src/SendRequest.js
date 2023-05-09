import axios from 'axios';

axios.defaults.withCredentials = true;

const api = axios.create({
    baseURL: 'http://localhost:4000',
});

export const analyzeEmotion = (msg) => {
    return api.post(`/emotion/`, {
        msg : msg
    })
}

export const tellJoke = () => {
    return api.post(`/joke/`, {});
}

const apis = {
    analyzeEmotion,
    tellJoke
}

export default apis