const express = require('express')
const app = express()

const { check, body, validationResult } = require('express-validator')
// check: Es un método genérico que puede usarse para validar cualquier parte de la solicitud (req.body, req.query, req.params, etc.). Es útil cuando quieres una sintaxis más compacta o cuando la misma validación puede aplicarse a diferentes lugares.

// body: Se usa específicamente para validar datos que se envían en el cuerpo de la solicitud (por ejemplo, en un formulario POST).

// query: Se usa para validar datos que se pasan en la cadena de consulta (query string) de la URL (por ejemplo, en una solicitud GET).

// param: Se usa para validar parámetros en la ruta (por ejemplo, en una ruta dinámica como /user/:id).

app.use(express.json())
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/log', [
  body('name')
    .exists().withMessage('El campo Nombre es obligatorio')
    .isLength({ min: 5 }).withMessage('El campo Nombre debe tener al menos 5 caracteres'),
  body('email')
    .exists().withMessage('El campo Email es obligatorio')
    .isEmail().withMessage('El campo Email debe ser un correo electrónico válido'),
  body('age')
    .exists().withMessage('El campo Edad es obligatorio')
    .isNumeric().withMessage('El campo Edad debe ser un número'),
], (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const values = req.body
    const validations = errors.array()
    res.render('index', { validations, values })
  } else {
    res.send('Validación exitosa')
  }
})


app.listen(3000, () => {
  console.log('Server up in http://localhost:3000')
})