import createError from 'http-errors'
const fileConfig = {
  'profile': {
    //Validaciones para la foto de eprfil
    fileFilter(req, file, cb) {
      const extname = /jpeg|jpg|png|gif/.test(path.extname(file.originalname).toLowerCase()) //Extensión de archivo correcta
      const mimeType = /jpeg|jpg|png|gif/.test(file.mimetype) //Tipo  de archivo correcto
      const size = file.size <= 1024 * 5 //Menor a 5 mb
      if (extname && mimeType && size) {
        return cb(null, true)
      }
      return cb(createError(400,'Formato de imagen incorrecto'), false)
    },
    //Carpeta destino
    destination(req, file, cb) {
      cb(null, 'uploads/profile')
    },
    //Nombre con el cual se almacena
    filename(req, file, cb) {
      let fileExtension = file.mimetype.split('/')
      fileExtension = fileExtension[1] || 'txt'
      const fileName = req.params.id + '.' + fileExtension
      cb(null, fileName)
    }
  }
}

module.exports = {
  fileConfig
}