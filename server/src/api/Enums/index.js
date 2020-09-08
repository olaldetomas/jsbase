const nationality = {
  Argentina: 'Argentina',
  Bolivia: 'Bolivia',
  Peru: 'Peru',
  Chile: 'Chile',
  Paraguay: 'Paraguay',
  Brasil: 'Brasil',
  Venezuela: 'Venezuela',
  Colombia: 'Colombia',
  Ecuador: 'Ecuador',
  Otra: 'Otra',
}
enumToModel = (enumeration) => {
  const enumerationArray = []
  for (const prop in enumeration) {
    enumerationArray.push({ value: enumeration[prop], text: prop })
  }
  return enumerationArray
}

module.exports = {
  nationality,
}
