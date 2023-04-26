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

const apis = {
    analyzeEmotion
}

export default apis