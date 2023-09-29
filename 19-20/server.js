// Бекенд создан для обхода CORS со стороны VK API.
import express from 'express';
import fetch from 'node-fetch';
import fs from 'fs';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.get('/getPosts', async (req, res) => {
    try {
        const config = JSON.parse(fs.readFileSync('config.json')); // Чтение файла с токеном.
        const ownerId = -147286578;
        const count = 10;
        const offset = Number(req.query.offset); // offset получаем из запроса от фронтенд-части.
        const accessToken = config.apiKey; // Из файла с токеном берем токен.
        const apiVersion = '5.150';

        const apiUrl = `https://api.vk.com/method/wall.get?owner_id=${ownerId}&count=${count}&offset=${offset}&v=${apiVersion}&access_token=${accessToken}`; // url запроса к VK API.

        const response = await fetch(apiUrl);
        const data = await response.json();
        res.json(data);

    } catch (error) {
        console.error('Произошла ошибка:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});