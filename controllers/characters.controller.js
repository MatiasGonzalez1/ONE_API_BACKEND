import {pool} from '../db.js'

//******************Get******************/
//GET all from table characters
export const getCharacters = async (req, res)=>{
  
  try {
  const [rows]= await pool.query('SELECT * FROM Characters')
  res.json(rows)
  }catch (error){
    return res.status(500).json({
      message: 'Something goes wrong'
    })
  }
}

export const getOneCharacter = async (req, res)=>{
  // const id = req.params.id
  const [rows]= await pool.query('SELECT * FROM Characters WHERE id_character = ?', [req.params.id])

  if(rows.length <= 0) return res.status(404).json({
    message: 'Character not found'
  })
  res.json(rows[0])
}

//**********************Post*******************/
//POST to table characters
export const postCharacters = async (req, res)=> {
  const {name, lastName, origin, position, crew, reward} = req.body

  try {
  const [rows] = await pool.query('INSERT INTO Characters (name, last_name, origin, position, crew, reward) VALUES (?,?,?,?,?,?)', [name, lastName, origin, position, crew, reward])
  res.send({
    id: rows.insertId,
    name,
    lastName,
    origin,
    position,
    crew,
    reward
  })
  }catch (error){
    return res.status(500).json({
      message: 'Something goes wrong'
    })
  }
}

//****************************PATCH******************************* */
export const pathCharacters = async (req, res)=> {
  //las llaves son el equivalente a id = req.params.id
  const {id} = req.params
  const {name, lastName, origin, position, crew, reward} = req.body
  try {
  
  //en el caso de querer cambiar solo un dato se debe cambiar el name = ? por name = IFNULL(?, name)
  const result = await pool.query('UPDATE Characters SET name = IFNULL(?, name), last_name = IFNULL(?, last_name), origin = IFNULL(?, origin), position = IFNULL(?, position), crew =IFNULL(?, crew), reward = IFNULL(?, reward)  WHERE id_character = ?', [name, lastName, origin, position, crew, reward, id])

  if (result.affectedRows == 0) return res.status(404).json({
    message: 'Character not found'
  })
  else if (result.affectedRows == 1) return res.status(200).json({
    message: 'Character modified'
  })  

  const [rows]= await pool.query('SELECT * FROM Characters WHERE id_character = ?', [id])

  res.json(rows[0]) 
  }catch (error){
    return res.status(500).json({
      message: 'Something goes wrong'
    })
  }
}

//*********************DELETE*********************************** */
export const deleteCharacters = async (req, res)=> {
  try {
  const [result] = await pool.query('DELETE FROM Characters WHERE id_character = ?', [req.params.id])
  
  if(result.affectedRows <= 0) return res.status(404).json({
    message: 'Character not found'
  }) 
  else if (result.affectedRows == 1) return res.status(200).json({
    message: 'Character deleted'
  })
  res.sendStatus(204)
  }catch (error){
    return res.status(500).json({
      message: 'Something goes wrong'
    })
  }
}