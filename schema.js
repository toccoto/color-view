import Vibrant from 'node-vibrant'
import nouns from './nouns.json'
const axios = require('axios').default

var {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt
} = require('graphql')

const posts = [
  {
    title: 'First post',
    description: 'Content of the first post',
    author: 'Flavio'
  },
  {
    title: 'Second post',
    description: 'Content of the second post',
    author: 'Roger'
  }
]

const authors = {
  Flavio: {
    name: 'Flavio',
    age: 36
  },
  Roger: {
    name: 'Roger',
    age: 7
  }
}

const authorType = new GraphQLObjectType({
  name: 'Author',
  fields: {
    name: {
      type: GraphQLString
    },
    age: {
      type: GraphQLInt
    }
  }
})

const postType = new GraphQLObjectType({
  name: 'Post',
  fields: {
    title: {
      type: GraphQLString
    },
    description: {
      type: GraphQLString
    },
    author: {
      type: authorType,
      resolve: source => {
        return authors[source.author]
      }
    }
  }
})

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
            ? nouns.data[parseInt(Math.random() * 1000)]
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
            palette: pValues
          }
        } catch (err) {
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
