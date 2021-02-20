import axios from 'axios';

import { apiURL } from '../config'

const { API_URL } = apiURL;

export const fetchChuckNorris = async() => {
    return await axios.get(API_URL)
        .then(res => res)
        .catch(err => err);
}