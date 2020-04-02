import React, { memo, useTransition, useState } from 'react'
import PropTypes from 'prop-types'

import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import CasinoIcon from '@material-ui/icons/Casino'
import { makeStyles } from '@material-ui/core/styles'

import { fetchImageToTheme } from './ImageToTheme'

const useStyles = makeStyles(({ spacing }) => ({
  searchInput: {
    marginLeft: spacing(2)
  }
}))

const SearchBar = ({ randomWord, fetchNewImage }) => {
  const classes = useStyles()
  const [inputValue, setInputValue] = useState('')
  const [startTransition, isPending] = useTransition({ timeoutMs: 5000 })

  return (
    <Paper variant="outlined">
      <InputBase
        className={classes.searchInput}
        placeholder="Image Search"
        inputProps={{ 'aria-label': 'search for image' }}
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        onKeyPress={e => {
          if (e.key === 'Enter') {
            startTransition(() => fetchNewImage(inputValue))
          }
        }}
      />
      <IconButton
        onClick={() => {
          startTransition(() => fetchNewImage(randomWord))
        }}
      >
        <SearchIcon />
      </IconButton>
      <IconButton
        color="secondary"
        onClick={() => {
          startTransition(() => fetchNewImage(randomWord))
        }}
      >
        <CasinoIcon />
      </IconButton>
    </Paper>
  )
}

SearchBar.propTypes = {
  randomWord: PropTypes.string
}

export default memo(SearchBar)
