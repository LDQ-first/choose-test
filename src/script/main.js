const axios = require('axios')
const path = require('path')

const zone = document.getElementById('zone')
const result =  document.getElementById('result')

// axios.get(path.resolve(__dirname, './src/data.json'))
axios.get('./src/data.json')
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
            } else {
                result.innerHTML = ``
              }
        })
     })
     .catch( (err) => {
        console.log(err)
      })


// http://baobab.kaiyanapp.com/api/v4/discovery

// https://bird.ioliu.cn/v2?url=http://baobab.kaiyanapp.com/api/v4/discovery/category
// https://bird.ioliu.cn/v2?url=http://baobab.kaiyanapp.com/api/v4/discovery/hot

const categoryUrl = 'https://bird.ioliu.cn/v2?url=http://baobab.kaiyanapp.com/api/v4/discovery/category'
const hotUrl = 'https://bird.ioliu.cn/v2?url=http://baobab.kaiyanapp.com/api/v4/discovery/hot'

const category = () => axios.get(categoryUrl)
const hot = () => axios.get(hotUrl)

const author = document.getElementById('author')
const authorResult =  document.getElementById('authorResult')

axios.all( [ category(), hot() ] )
     .then( axios.spread( ( categoryRes, hotRes) => {
        const { data: categoryData } = categoryRes
        const { data: hotData } = hotRes
        console.log(`categoryData: `, categoryData)
        console.log(`hotData: `, hotData)
        const { itemList: categoryList } = categoryData
        const { itemList: hotList } = hotData

        let optionJson = {
            author: {}
        }
        optionJson.author.category = []
        optionJson.author.hot = []
        categoryList.forEach((item, index) => {
            optionJson.author.category.push(item.type)
        })
        hotList.forEach((item, index) => {
            optionJson.author.hot.push(item.type)
        })
        console.log(`optionJson: `, optionJson)

        author.addEventListener('change', () => {
            const index = author.selectedIndex
            const value = author[index].value
            console.log(`value: ${value}`)
            const resultOptions = optionJson.author[value] 
            let kyOptionCode = ``
            console.log('resultOptions: ', resultOptions)
            if (resultOptions) {
              resultOptions.forEach((item, index) => {
                  const code = `<option value ="item">${item}</option>`
                  kyOptionCode += code
              })
              authorResult.innerHTML = kyOptionCode
            } else {
              authorResult.innerHTML = ``
            }

        })
     } ) )
     .catch( (err) => {
        console.log(err)
      })


