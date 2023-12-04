import * as React from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShareIcon from '@mui/icons-material/Share'
import test from '../../assets/img/test.jpg'

const FeaturedCard = () => {
  return (
    <Card sx={{ maxWidth: 345, margin: 2 }}>
      <CardHeader title="Introduce New Book" subheader="Edgar Allen Poe" />
      <CardMedia component="img" height="100%" image={test} alt="featured-image" />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook together with your
          guests. Add 1 cup of frozen peas along with the mussels, if you like.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  )
}

export default FeaturedCard
