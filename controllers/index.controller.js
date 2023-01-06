import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const index = (req, res)=>{
  let html = path.resolve(__dirname, '../views/home.html')
  res.sendFile(html)
}