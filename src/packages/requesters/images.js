import axios from 'axios';
import { IMPAGES_API_PATH } from '../constants/apiPaths';


export const requestImages = () => axios.get(
    IMPAGES_API_PATH,
    {
        credentials: 'same-origin',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    }
);
