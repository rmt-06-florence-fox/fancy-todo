const axios = require('axios')

class MusicController {
    static getMusic (req, res, next) {
       axios({
           url: 'https://api.deezer.com/search?q=queen',
           method: 'get'
       }) 
       .then((response)=> {
           const music= []
           response.data.data.forEach(element => {
               music.push({
                   title: element.title,
                   artist: element.artist.name,
                   album: element.album.title
               })
           })
           res.status(200).json(music)
       })
       .catch((error) => {
           next(error)
       })
    }
}

module.exports = MusicController