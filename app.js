//archivo de configuraciones de express

import express from "express";
import charactersRoutes from './routes/characters.routes.js';
// import indexRoutes from './routes/index.routes.js'
import cors from "cors";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as path from 'path';
// import { ping } from "./controllers/index.controller.js";


const app = express();

app.use(cors());
app.use(express.json())

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//Conexion a la db
// app.use(indexRoutes)

app.get('/', (req,res)=> {
  let html = path.resolve(__dirname, './views/home.html')
  res.sendFile(html)
})


app.use('/api',charactersRoutes)

app.use((req, res, next)=>{
  res.status(404).json({
    message: 'Endpoint Not found'
  })

})

export default app