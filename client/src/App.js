import React, { Suspense, useTransition } from 'react'
import graphql from 'babel-plugin-relay/macro'
import { RelayEnvironmentProvider, useLazyLoadQuery } from 'react-relay/hooks'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  TextField,
  Grid,
  Paper,
  Container,
  Box
} from '@material-ui/core'
import InputBase from '@material-ui/core/InputBase'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import CasinoIcon from '@material-ui/icons/Casino'
import {
  ThemeProvider,
  createMuiTheme,
  makeStyles
} from '@material-ui/core/styles'
import logo from './logo.svg'
import './App.css'
import Environment from './Environment'
import SearchImage from './SearchImage'
import { AppQuery } from './__generated__/AppQuery.graphql'
import { loadPartialConfig } from '@babel/core'

export const PaletteContext = React.createContext()

const useStyles = makeStyles(({ spacing, palette }) => ({
  backDisplay: {
    backgroundColor: palette?.primary?.background ?? 'white',
    marginTop: spacing(3),
    padding: spacing(2)
  },
  mainContainer: {
    minHeight: 'calc(100vh - 100px)',
    backgroundColor: palette?.primary?.background ?? 'white',
    padding: spacing(4)
  },
  searchInput: {
    marginLeft: spacing(2)
  },
  topSpacing: {
    marginTop: spacing(2)
  }
}))

const App = ({ setPalette }) => {
  const [startTransition, isPending] = useTransition({ timeoutMs: 5000 })
  const [searchValue, setSearchValue] = React.useState('')
  const [inputValue, setInputValue] = React.useState('')
  const [fetchKey, setFetchKey] = React.useState(0)

  const data = useLazyLoadQuery(
    graphql`
      query AppQuery($searchValue: String) {
        imagePalette(searchValue: $searchValue) {
          ...SearchImage_imagePalette
        }
      }
    `,
    { searchValue },
    {
      fetchPolicy: searchValue === '' ? 'network-only' : 'store-and-network',
      fetchKey
    }
  )

  const classes = useStyles()

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Theme from Image</Typography>
        </Toolbar>
      </AppBar>
      <Container className={classes.mainContainer}>
        <Grid container spacing={2} justify="center">
          <Suspense fallback={'Loading...'}>
            <SearchImage
              setInputValue={setInputValue}
              imagePalette={data.imagePalette}
              setPalette={setPalette}
              isPending={isPending}
            />
          </Suspense>
          <Grid
            container
            className={classes.topSpacing}
            justify="center"
            alignItems="flex-end"
          >
            <Paper variant="outlined">
              <InputBase
                className={classes.searchInput}
                placeholder="Image Search"
                inputProps={{ 'aria-label': 'search for image' }}
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                onKeyPress={e => {
                  if (e.key === 'Enter') {
                    startTransition(() => setSearchValue(inputValue))
                  }
                }}
              />
              <IconButton
                onClick={e => setSearchValue(inputValue)}
                aria-label="search"
              >
                <SearchIcon />
              </IconButton>
              <IconButton
                color="secondary"
                onClick={() => {
                  startTransition(() => {
                    setSearchValue('')
                    setFetchKey(fetchKey + 1)
                  })
                }}
              >
                <CasinoIcon />
              </IconButton>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

function AppRoot(props) {
  const [palette, setPalette] = React.useState(false)

  const theme = React.useMemo(
    () =>
      createMuiTheme(
        !palette
          ? {}
          : {
              palette: {
                primary: {
                  main: palette.primary,
                  background: palette.background
                },
                secondary: {
                  main: palette.secondary
                }
              }
            }
      ),
    [palette]
  )

  return (
    <RelayEnvironmentProvider environment={Environment}>
      <ThemeProvider theme={theme}>
        <PaletteContext.Provider value={palette}>
          <Suspense fallback={'Loading...'}>
            <App setPalette={setPalette} />
          </Suspense>
        </PaletteContext.Provider>
      </ThemeProvider>
    </RelayEnvironmentProvider>
  )
}

export default AppRoot
