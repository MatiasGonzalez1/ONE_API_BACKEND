//archivo de configuraciones de express
import express from "express";
import cors from "cors";

import charactersRoutes from './routes/characters.routes.js';
import indexRoutes from './routes/index.routes.js'
const app = express();

app.use(cors());
app.use(express.json())

// Determinacion de folder 'public' como archivos estaticos
app.use(express.static("./public")); 

app.use('/', indexRoutes)

app.use('/api',charactersRoutes)

app.use((req, res, next)=>{
  res.status(404).json({
    message: 'Endpoint Not found'
  })

})

export default app