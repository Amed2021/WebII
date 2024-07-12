const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const port = 3000;

const uri = "mongodb+srv://allanblancocastro15:<password>@facechat.pg1ckck.mongodb.net/?retryWrites=true&w=majority&appName=FaceChat";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

app.use(bodyParser.json());

async function connectToDatabase() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Conexión exitosa a MongoDB!");
  } catch (err) {
    console.error('Error al conectar con MongoDB:', err);
  }
}

connectToDatabase();

app.post('/Registro', async (req, res) => {
  const { email, username, password, fechaNacimiento } = req.body;

  // Validación de edad mínima
  const fechaActual = new Date();
  const edadMinima = new Date(fechaActual.setFullYear(fechaActual.getFullYear() - 18));

  if (new Date(fechaNacimiento) > edadMinima) {
    return res.status(400).json({ message: 'Debes tener al menos 18 años para registrarte.' });
  }

  try {
    const db = client.db('FaceChat');
    const usersCollection = db.collection('Registro');

    const newUser = { email, username, password, fechaNacimiento };
    const result = await usersCollection.insertOne(newUser);

    console.log('Usuario registrado:', result.insertedId);
    res.status(201).json({ message: 'Usuario registrado correctamente.' });
  } catch (error) {
    console.error('Error al insertar usuario:', error);
    res.status(500).json({ message: 'Error al registrar el usuario.' });
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
});
