var convert = require('xml-js')

function xmlToObj(xmlText) {
  return JSON.parse(convert.xml2json(xmlText, { compact: true, spaces: 4 }))
}

module.exports={
  xmlToObj
}