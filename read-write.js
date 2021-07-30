// Let's have some fun with NodeJS

const fs = require('fs')
const path = './task-data.csv'

fs.readFile(path, 'utf8', (error, data) => {
  if (error) {
    console.log(error)
  } else {
    const lines = data.split('\r\n')
    const header = lines[0].split(',')
    const info = lines.slice(1)
    
    const o = header
      .map((line, key) => ({
        key, line
      }))
      .filter(({key, line}) => line === 'ColInQuestion')[0].key
    const values = [...new Set(info.map(line => 
      line.split(',')[o].split(';')[0]
    ))]

    const newHeader = [...header, ...values]
    console.log(newHeader)

    const finalCollection = [
      newHeader.join(','),
      ...info
    ].join('\r\n')

    fs.writeFile('./test.csv', finalCollection, error => {
      console.log('n-a mers', error)
      return 
    })
  }
})
