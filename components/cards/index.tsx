import * as React from 'react'
import { styled } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Collapse from '@mui/material/Collapse'
import IconButton, { type IconButtonProps } from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import getDog from '../../helpers/getDog'
import { info } from 'console'

const initialDog = [
  {
    id: 'hNa0pli30',
    url: 'https://cdn2.thedogapi.com/images/hNa0pli30.jpg',
    width: 1080,
    height: 1157
  }
]
const initialInfoDog = [
  {
    id: 'sNtR0_fd',
    url: 'https://cdn2.thedogapi.com/images/sNtR0_fdu.jpg',
    breeds: [
      {
        weight: {
          imperial: '35 - 65',
          metric: '6 - 29'
        },
        height: {
          imperial: '23 - 28',
          metric: '58 - 71'
        },
        id: 213,
        name: 'Saluki',
        bred_for: 'Coursing gazelle and hare',
        breed_group: 'Hound',
        life_span: '12 - 14 years',
        temperament: 'Aloof, Reserved, Intelligent, Quiet',
        reference_image_id: 'fjFIuehNo'
      }
    ],
    width: 734,
    height: 668
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

interface DoCardProps {
  id: number | null
  callback?(): void;
  doggo?: object
}

const DoCard: React.FC<DoCardProps> = ({ id, callback, doggo }) => {
  const [expanded, setExpanded] = React.useState(false)
  const [clicked, setClicked] = React.useState(false)
  const handleExpandClick = (): void => {
    setExpanded(!expanded)
  }

  const handleFavClick = (): void => {
    setClicked(!clicked)
  }
  const [dog, setDog] = React.useState(initialDog)
  const [infoDog, setInfoDog] = React.useState(initialInfoDog)
  const [error, setError] = React.useState('')
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        if (id === null) {
          setLoading(true)
          const newDog = await getDog(null, false)
          setDog(newDog)

          if (newDog?.[0].id) {
            const infoDogResult = await getDog(newDog[0].id, false)
            setInfoDog(infoDogResult)
            if (!infoDogResult.breeds || infoDogResult.breeds.length === 0) {
              await fetchData()
            }
          }
        } else {
          const infoDogResult = await getDog(doggo.id, false)
          setInfoDog(infoDogResult)
          console.log(infoDog)
          if (!infoDogResult.breeds || infoDogResult.breeds.length === 0) {
            await fetchData()
          }
        }
      } catch (error) {
        setError('Error al cargar las razas')
      } finally {
        setLoading(false)
      }
    }

    void fetchData()
  }, [])

  if (loading) {
    return <div>Cargando...</div>
  }

  if (error !== '') {
    return <div>Error: {error}</div>
  }
  console.log(infoDog)
  return (
    <div>
      <Card sx={{ maxWidth: 345 }}>
          <CardHeader
            title={infoDog.breeds === undefined ? 'No especificada' : infoDog.breeds[0].name}
            subheader={infoDog.breeds === undefined ? 'No especificada' : infoDog.breeds[0].life_span}
          />
          <CardMedia
            component="img"
            height="194"
            image={infoDog.url}
            alt="Dog"
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {infoDog.breeds === undefined ? 'No especificada' : infoDog.breeds[0].breed_group}
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
                {infoDog.breeds === undefined ? 'No especificada' : infoDog.breeds[0].bred_for}
              </Typography>
              <Typography paragraph>
                {infoDog.breeds === undefined ? 'No especificada' : infoDog.breeds[0].temperament}
              </Typography>
            </CardContent>
          </Collapse>
      </Card>
    </div>
  )
}

export default DoCard
