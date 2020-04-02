import React, { memo, useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import graphql from 'babel-plugin-relay/macro'
import { preloadQuery, usePreloadedQuery, fetchQuery } from 'react-relay/hooks'

import SearchBar from './SearchBar'
import Environment from './Environment'

const query = graphql`
  query ImageToThemeQuery($searchValue: String) {
    imagePalette(searchValue: $searchValue) {
      randomWord
      ...SearchImage_imagePalette
    }
  }
`

const initialResult = preloadQuery(Environment, query, { searchValue: '' })

export const fetchImageToTheme = (searchValue = '') => {
  console.log(searchValue)
  fetchQuery(Environment, query, { searchValue }).subscribe({
    start: () => console.log('start'),
    complete: () => console.log('complete'),
    error: error => console.log(error),
    next: data => console.log(data)
  })
}

const ImageToTheme = () => {
  const [result, setResult] = useState(initialResult)
  const { imagePalette } = usePreloadedQuery(query, result)

  const fetchNewImage = useCallback(
    (searchValue = '') => {
      setResult(preloadQuery(Environment, query, { searchValue }))
    },
    [setResult]
  )

  return (
    <>
      <SearchBar
        fetchNewImage={fetchNewImage}
        randomWord={imagePalette.randomWord}
      />
      {imagePalette.randomWord}
    </>
  )
}

export default memo(ImageToTheme)
