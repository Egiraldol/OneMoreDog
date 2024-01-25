import * as React from 'react'
import { styled } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Collapse from '@mui/material/Collapse'
import IconButton, { IconButtonProps } from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import getBreeds from '../../helpers/getBreed'

const url = 'https://api.thecatapi.com/v1/images/search?limit=3'
const api_key = 'live_u4ssREEOK7ORyFd4mNg4NmzKxL5Jfeive2k2O9fjS9K15tT8PWXQnuOzaB52KtmV'
const initialDog = [
  {
    'id': 'hNa0pli30',
    'url': 'https://cdn2.thedogapi.com/images/hNa0pli30.jpg',
    'width': 1080,
    'height': 1157
  }
]

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props

  return <IconButton {...other} />
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest
  })
}))

const DoCard: React.FC = () => {
  const [expanded, setExpanded] = React.useState(false)
  const [clicked, setClicked] = React.useState(false)
  const handleExpandClick = (): void => {
    setExpanded(!expanded)
  }

  const handleFavClick = (): void => {
    setClicked(!clicked)
  }
  const [dog, setDog] = React.useState(initialDog)
  const [error, setError] = React.useState('')
  React.useEffect(() => {
    updateBreeds()
  }, [])

  const updateBreeds = () => {
    getBreeds()
      .then((newDog) => {
        setDog(newDog)
      })
      .catch((error) => {
        console.log(error)
        setError('Error al cargar las razas')
      })
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          title="Lorem Ipsum"
          subheader="01/24/24"
        />
        <CardMedia
          component="img"
          height="194"
          image={dog[0].url}
          alt="Cat"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            Cat
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites" onClick={handleFavClick}>
            <FavoriteIcon color={clicked ? 'error' : 'default'}/>
          </IconButton>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Description:</Typography>
            <Typography paragraph>
              Cute cat
            </Typography>
            <Typography paragraph>
              :3
            </Typography>
          </CardContent>
        </Collapse>
    </Card>
  )
}

export default DoCard
