import express from "express";
import CarrosModel from "./CarrosModel.js";

const { Router } = express;

export default class CarrosController {
  #router = Router();
  #carrosModel = null;
  
  constructor() {
    this.registerRoutes();
  }
  
  getRouter() {
    return this.#router;
  }
  
  registerRoutes() {
    const routerV1 = Router();
    routerV1.get(`/carros`, async (req, res) => await this.getAllCarros(req, res));
    routerV1.post(`/carros`, async (req, res) => await this.insertCarro(req, res));
    routerV1.delete(`/carros/:id`, async (req, res) => await this.deleteCarro(req, res));
    
    this.#router.use(`/v1`, routerV1);
  }
  
  async getAllCarros(req, res) {
    try {
      this.#carrosModel = new CarrosModel();
      this.#carrosModel.connect();
      const carros = await this.#carrosModel.getAllCarros();
      res.json(carros);
    } catch (error) {
      console.error(`Error: ${error}`);
      res.status(500).json({ error: 'Error al obtener los carros.' });
    } finally {
      this.#carrosModel.closeConnection();
    }
  }
  
  async insertCarro(req, res) {
    const { marca, modelo, año, precio, imagen } = req.body;
    if (!marca || !modelo || !año || !precio || !imagen) {
      return res.status(400).json({ error: 'Todos los campos son requeridos: marca, modelo, año, precio e imagen.' });
    }

    try {
      this.#carrosModel = new CarrosModel();
      this.#carrosModel.connect();
      const carroId = await this.#carrosModel.insertCarro(marca, modelo, año, precio, imagen);
      res.status(201).json({ message: 'Carro insertado correctamente.', carroId });
    } catch (error) {
      console.error(`Error: ${error}`);
      res.status(500).json({ error: 'Error al insertar el carro.' });
    } finally {
      this.#carrosModel.closeConnection();
    }
  }
  
  async deleteCarro(req, res) {
    const carroId = req.params.id;
    if (!carroId) {
      return res.status(400).json({ error: 'Se requiere el ID del carro.' });
    }

    try {
      this.#carrosModel = new CarrosModel();
      this.#carrosModel.connect();
      const rowsAffected = await this.#carrosModel.deleteCarro(carroId);
      if (rowsAffected === 0) {
        return res.status(404).json({ error: 'Carro no encontrado.' });
      }
      res.json({ message: 'Carro eliminado correctamente.' });
    } catch (error) {
      console.error(`Error: ${error}`);
      res.status(500).json({ error: 'Error al eliminar el carro.' });
    } finally {
      this.#carrosModel.closeConnection();
    }
  }
}
