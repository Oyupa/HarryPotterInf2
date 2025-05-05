const express = require('express');
const bodyParser = require('body-parser');
const bearerToken = require('express-bearer-token');
const cors = require('cors');
const db = require('./config/db');
const moviesRoutes = require('./routes/moviesRoutes');
const charactersRoutes = require('./routes/charactersRoutes');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bearerToken());

// Rutas de la API
app.use('/peliculas', moviesRoutes);
app.use('/personajes', charactersRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('API Harry Potter funcionando correctamente. Puedes acceder a /peliculas o /personajes para ver los datos.');
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
