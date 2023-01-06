//archivo de configuraciones de express
import express from "express";
import cors from "cors";

import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import charactersRoutes from './routes/characters.routes.js';
import indexRoutes from './routes/index.routes.js'
const app = express();

app.use(cors());
app.use(express.json())

// Determinacion de folder 'public' como archivos estaticos
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRoutes)

app.use('/api',charactersRoutes)

app.use((req, res, next)=>{
  res.status(404).json({
    message: 'Endpoint Not found'
  })

})

export default app