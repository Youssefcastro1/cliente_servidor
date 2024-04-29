const express = require('express');
const app = express();

// Middleware para analizar JSON y urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta para procesar el formulario
app.post('/procesar_formulario.php', (req, res) => {
    // Aquí puedes escribir el código para procesar el formulario
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});