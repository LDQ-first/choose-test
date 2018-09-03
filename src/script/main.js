const axios = require('axios')
const path = require('path')

const zone = document.getElementById('zone')
const result =  document.getElementById('result')

axios.get(path.resolve(__dirname, './src/data.json'))
     .then((res) => {
        console.log(`res: `, res)
        const { data } = res
        zone.addEventListener('change', () => {
            const index = zone.selectedIndex
            const value = zone[index].value
            console.log('onChange')
            console.log(`value: ${value}`)
            console.log(`data: `, data)
            const resultOptions = data.zone[value] 
            let optionCode = ``
            console.log('resultOptions: ', resultOptions)
            resultOptions.forEach((item, index) => {
                const code = `<option value ="item">${item}</option>`
                optionCode += code
            })
            result.innerHTML = optionCode
        })
     })




/* zone.addEventListener('click', () => {
    console.log('Click')
}) */

