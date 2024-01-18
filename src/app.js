import express from "express"
import path from 'path';
import { fileURLToPath } from 'url';
import hbs from 'hbs';
import { geocode } from "../utils/geocode.js"
import { forecast } from "../utils/forecast.js"

// Define paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

const app = express()

// Express config
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(
  express.static(path.join(__dirname, '../public'))
)
app.get('', (req, res) => {
  res.render('index', {
    title: 'Masha',
    name: 'Mashaaa'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'Masha',
    name: 'Mashaaa'
  })
})

app.get('/weather', (req, res) => {

  if (!req.query.address) {
    return res.send({
      error: 'You must provide address'
    })
  }

  geocode(req.query.address, (error, data) => {
    if (error) {
      return res.send({
        error: 'You must give real address'
      })
    }

    forecast(data, (error, forecastData) => {
      if (error) {
        return res.send({
          error: 'Cannot get forecats for your location'
        })
      }

      res.send({ weather: forecastData })
    })
  })
})

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'you must provide search term'
    })
  }
  console.log(req.query.search)
  res.send({
    products: []
  }
  )
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    error: 'This help is absent'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    error: ';('
  })
})

app.listen(3300, () => {
  console.log('server is running port 3300')
})
