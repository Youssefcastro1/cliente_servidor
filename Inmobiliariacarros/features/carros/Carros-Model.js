import mysql from 'mysql';

export default class CarrosModel {
  constructor() {
    this.connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "inmobiliariacarros",
    });
  }

  connect() {
    this.connection.connect();
  }

  closeConnection() {
    this.connection.end();
  }

  async getAllCarros() {
    const query = 'SELECT id, marca, modelo, año, precio, imagen FROM carros';
    try {
      const results = await new Promise((resolve, reject) => {
        this.connection.query(query, (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        });
      });
      return results;
    } catch (error) {
      throw error;
    }
  }

  async insertCarro(marca, modelo, año, precio, imagen) {
    const query = 'INSERT INTO carros (marca, modelo, año, precio, imagen) VALUES (?, ?, ?, ?, ?)';
    try {
      const result = await new Promise((resolve, reject) => {
        this.connection.query(query, [marca, modelo, año, precio, imagen], (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        });
      });
      return result.insertId; // Devuelve el ID del nuevo carro insertado
    } catch (error) {
      throw error;
    }
  }

  async deleteCarro(carroId) {
    const query = 'DELETE FROM carros WHERE id = ?';
    try {
      const result = await new Promise((resolve, reject) => {
        this.connection.query(query, [carroId], (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        });
      });
      return result.affectedRows; // Devuelve el número de filas afectadas
    } catch (error) {
      throw error;
    }
  }

  async seedCarros() {
    const carros = [
      { marca: 'Toyota', modelo: 'Corolla', año: 2022, precio: 25000, imagen: 'COROLLA.png' },
      { marca: 'Honda', modelo: 'Civic', año: 2020, precio: 22000, imagen: 'Honda.jpg' },
      { marca: 'Ford', modelo: 'Mustang', año: 2021, precio: 35000, imagen: 'Ford.jpg' },
      { marca: 'Chevrolet', modelo: 'Camaro', año: 2019, precio: 30000, imagen: 'Chevrolet.jpg' }
    ];

    const insertQueries = carros.map(carro => {
      return new Promise((resolve, reject) => {
        const query = 'INSERT INTO carros (marca, modelo, año, precio, imagen) VALUES (?, ?, ?, ?, ?)';
        this.connection.query(query, [carro.marca, carro.modelo, carro.año, carro.precio, carro.imagen], (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        });
      });
    });

    try {
      await Promise.all(insertQueries);
      console.log('Carros insertados exitosamente.');
    } catch (error) {
      throw error;
    }
  }
}
