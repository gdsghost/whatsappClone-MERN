import axios from 'axios'

const instance = axios.create({
    baseURL:'https://whatsapp-mern-sudamyasodya.herokuapp.com',
});

export default instance;