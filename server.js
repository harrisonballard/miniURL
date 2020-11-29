const express = require('express')
const mongoose = require('mongoose')
const ShortURL = require('./models/shortURL')
const app = express()
// fill in username and password below to run 
var mongodb = 'mongodb+srv://<username>:<password>@urlshortener.y2fvr.mongodb.net/urlshortener?retryWrites=true&w=majority';

mongoose.connect(mongodb, {
    useNewUrlParser: true, useUnifiedTopology: true
})

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))


app.get('/', async (req, res) => {
    const shortURLs = await ShortURL.find()
    res.render('index', { shortURLs: shortURLs })
})

app.post('/shortURLs', async (req, res) => {
    await ShortURL.create({ full: req.body.fullURL })
    res.redirect('/')
})

app.get('/:shortURL', async (req, res) => {
    const shortURL = await ShortURL.findOne({ short: req.params.shortURL })
    if (shortURL == null) return res.sendStatus(404)

    shortURL.save()
  
    res.redirect(shortURL.full)
  })

// below allows for deploying later, but defaults to 3001
app.listen(process.env.PORT || 3001)