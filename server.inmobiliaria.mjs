import express, { json } from 'express';
import CarrosController from './features/carros/api/v1/carros-controller.js';

const app = express();

// Middleware para devolver responses como JSON
app.use(json());

// Routes
const carrosApiController = new CarrosController();
app.use('/api/', carrosApiController.getRouter());

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
