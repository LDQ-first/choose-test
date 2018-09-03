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
            console.log(`value: ${value}`)
            console.log(`data: `, data)
            const resultOptions = data.zone[value] 
            let optionCode = ``
            console.log('resultOptions: ', resultOptions)
            if (resultOptions) {
              resultOptions.forEach((item, index) => {
                  const code = `<option value ="item">${item}</option>`
                  optionCode += code
              })
              result.innerHTML = optionCode
            }
        })
     })


// http://baobab.kaiyanapp.com/api/v4/discovery

// https://bird.ioliu.cn/v2?url=http://baobab.kaiyanapp.com/api/v4/discovery/category
// https://bird.ioliu.cn/v2?url=http://baobab.kaiyanapp.com/api/v4/discovery/hot

const categoryUrl = 'https://bird.ioliu.cn/v2?url=http://baobab.kaiyanapp.com/api/v4/discovery/category'
const hotUrl = 'https://bird.ioliu.cn/v2?url=http://baobab.kaiyanapp.com/api/v4/discovery/hot'

const category = () => axios.get(categoryUrl)
const hot = () => axios.get(hotUrl)

axios.all( [ category(), hot() ] )
     .then( axios.spread( ( categoryRes, hotRes) => {
        const { data: categoryData } = categoryRes
        const { data: hotData } = hotRes
        console.log(`categoryData: `, categoryData)
        console.log(`hotData: `, hotData)
        
     } ) )



