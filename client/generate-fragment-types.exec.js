const fetch = require('node-fetch')
const fs = require('fs')
const path = require('path')

module.exports = function generateFragmentTypes(API_HOST) {
  return fetch(`${API_HOST}/graphql`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      variables: {},
      query: `
        {
          __schema {
            types {
              kind
              name
              possibleTypes {
                name
              }
            }
          }
        }
      `,
    }),
  })
    .then(result => result.json())
    .then(result => {
      // here we're filtering out any type information unrelated to unions or interfaces
      const filteredData = result.data.__schema.types.filter(
        type => type.possibleTypes !== null,
      )
      result.data.__schema.types = filteredData

      const fragmentTypesPath = path.join(__dirname, './fragmentTypes.json')
      const filteredFileStr = fs.readFileSync(fragmentTypesPath, 'utf8')
      const filteredStr = JSON.stringify(result.data)

      if (filteredFileStr !== filteredStr) {
        fs.writeFile(fragmentTypesPath, filteredStr, err => {
          if (err) {
            console.error('Error writing fragmentTypes file', err)
          } else {
            console.log('Fragment types successfully extracted!')
          }
        })
      }
    })
}
