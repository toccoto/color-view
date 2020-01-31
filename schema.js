const Vibrant = require('node-vibrant')
const nouns = require('./nouns.json')
const axios = require('axios').default

var {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList
} = require('graphql')

const paletteType = new GraphQLObjectType({
  name: 'Palette',
  fields: {
    colorType: { type: GraphQLString },
    hex: { type: GraphQLString }
  }
})

const imagePaletteType = new GraphQLObjectType({
  name: 'ImagePalette',
  fields: {
    searchValue: {
      type: GraphQLString
    },
    imageSrc: {
      type: GraphQLString
    },
    randomWord: {
      type: GraphQLString
    },
    palette: {
      type: new GraphQLList(paletteType)
    }
  }
})

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    imagePalette: {
      type: imagePaletteType,
      args: {
        searchValue: {
          type: GraphQLString
        }
      },
      resolve: async (source, { searchValue }) => {
        try {
          searchValue = !searchValue
            ? nouns.data[parseInt(Math.random() * 877)]
            : searchValue
          const data = await axios.get('https://pixabay.com/api/', {
            params: {
              key: process.env.IMAGE_CLIENT_ID,
              q: searchValue,
              per_page: 3,
              image_type: 'photo'
            }
          })
          const image = data.data.hits[0].webformatURL
          const palette = await Vibrant.from(image).getPalette()
          const pValues = Object.keys(palette).map(p => ({
            colorType: p,
            hex: palette[p].getHex()
          }))
          return {
            searchValue,
            imageSrc: data.data.hits[0].webformatURL,
            palette: pValues,
            randomWord: nouns.data[parseInt(Math.random() * 877)]
          }
        } catch (err) {
          console.log(err)
          return {}
        }
      }
    }
  }
})

const schema = new GraphQLSchema({
  query: queryType
})

module.exports = schema
