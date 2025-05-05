const express = require('express');
const bodyParser = require('body-parser');
const bearerToken = require('express-bearer-token');
const cors = require('cors');
const db = require('./config/db');
const moviesRoutes = require('./routes/moviesRoutes');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bearerToken());

// Rutas de la API
app.use('/peliculas', moviesRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('API Harry Potter funcionando ✨');
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
