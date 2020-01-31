import React, { useTransition, useRef } from 'react'
import PropTypes from 'prop-types'
import { Grid, Fab, Box } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import Collapse from '@material-ui/core/Collapse'
import Fade from '@material-ui/core/Fade'
import Slide from '@material-ui/core/Slide'
import Hidden from '@material-ui/core/Hidden'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import { makeStyles } from '@material-ui/core/styles'
import { lighten, rgbToHex } from '@material-ui/core/styles/colorManipulator'
import PaletteIcon from '@material-ui/icons/Palette'
import graphql from 'babel-plugin-relay/macro'
import { useFragment } from 'react-relay/hooks'
import { PaletteContext } from './App'

const useStyles = makeStyles(({ palette, spacing, transitions }) => ({
  imageProps: {
    height: 'auto',
    width: 'auto',
    display: 'block',
    maxHeight: '500px',
    maxWidth: '100%',
    margin: 'auto'
  },
  gridEase: {
    height: '24px',
    transition: transitions.create('all', {
      easing: transitions.easing.sharp,
      duration: transitions.duration.enteringScreen
    })
  },
  card: {
    width: '100%',
    maxWidth: '500px',
    border: `1px solid ${palette.secondary.main}`
  }
}))

const createPalette = palette => ({
  primary: palette.find(a => a.colorType === 'Vibrant').hex,
  background: rgbToHex(
    lighten(palette.find(a => a.colorType === 'LightMuted').hex, 0.7)
  ),
  secondary: palette.find(a => a.colorType === 'Muted').hex
})

const SearchImage = ({
  setPalette,
  setInputValue,
  isPending,
  imagePalette
}) => {
  const data = useFragment(
    graphql`
      fragment SearchImage_imagePalette on ImagePalette {
        searchValue
        imageSrc
        palette {
          colorType
          hex
        }
      }
    `,
    imagePalette
  )

  const classes = useStyles()
  const [showColors, setShowColors] = React.useState(false)
  const internalPalette = React.useContext(PaletteContext)

  const { imageSrc: img, palette, searchValue } = data ?? {}

  React.useEffect(() => {
    setPalette(createPalette(palette))
    setInputValue('')
  }, [data])

  return (
    <Card className={classes.card}>
      <CardHeader
        title={isPending ? 'Searching...' : `Search for: ${searchValue}`}
      />
      <>
        <CardMedia
          classes={{ img: classes.imageProps }}
          component="img"
          image={img}
        />
        <Collapse in={Boolean(showColors)}>
          <Grid container justify="space-between" style={{ padding: '16px' }}>
            {palette.map(({ colorType, hex }) => (
              <Fab
                size="small"
                style={{ backgroundColor: hex }}
                key={colorType}
                onClick={() => {
                  setPalette({ ...internalPalette, [showColors]: hex })
                  setShowColors(false)
                }}
              >
                {''}
              </Fab>
            ))}
          </Grid>
        </Collapse>
        <CardContent>
          <Box display="flex">
            <Box
              className={classes.gridEase}
              flexGrow={showColors === 'secondary' ? 0 : 1}
              display="flex"
              justifyContent="center"
            >
              <Fade in={showColors !== 'secondary'}>
                <Fab
                  color="primary"
                  style={{ position: 'absolute' }}
                  size="small"
                  onClick={() =>
                    setShowColors(showColors === 'primary' ? false : 'primary')
                  }
                >
                  P
                </Fab>
              </Fade>
            </Box>
            <Box
              className={classes.gridEase}
              flexGrow={showColors === 'primary' ? 0 : 1}
              display="flex"
              justifyContent="center"
            >
              <Fade in={showColors !== 'primary'}>
                <Fab
                  style={{ position: 'absolute' }}
                  color="secondary"
                  size="small"
                  onClick={() =>
                    setShowColors(
                      showColors === 'secondary' ? false : 'secondary'
                    )
                  }
                >
                  S
                </Fab>
              </Fade>
            </Box>
          </Box>
        </CardContent>
      </>
    </Card>
  )
}

SearchImage.propTypes = {
  img: PropTypes.string,
  searchValue: PropTypes.string,
  setInputValue: PropTypes.func
}

export default React.memo(SearchImage)
