//Dependencia para extraer archivos de las request
const multer = require('multer')
//Importamos las configuraciones para carga de archivos
const { fileConfig } = require('../../config/fileConfigs')
class Uploader {

  constructor(config) {
    //Indicamos el destino y el nombre del archivo a crear
    this.storage = multer.diskStorage({
      destination: fileConfig[config].destination,
      filename: fileConfig[config].filename
    })
  }

  async use(req, res, next) {
    //Inicializamos multer
    const uploader = multer({
      storage: this.storage,
      fileFilter: fileConfig.fileFilter
    }).any()
    //Continuamos con el siguiente middleware
    return uploader(req, res, next)
  }

}

module.exports = Uploader