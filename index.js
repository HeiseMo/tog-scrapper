const express = require("express")
const cheerio = require("cheerio")
const download = require("node-image-downloader")
const request = require("request")
var fs = require('fs');

const app = express()

app.get("/:number", (req, res) => {
    console.log(req.params.number)
    let chapter = req.params.number
    var url = `https://towerofgod.me/comic/tower-of-god-chapter-${chapter}`

    request(url,(error,response,html) =>{
        if(!error){
            let $ = cheerio.load(html)

            let imagesrc = $(".PB0mN")
            let htmlContent = ""
            let images = ""
            imagesrc.each(function (idx, el) {
                console.log($.html(el));
                //let singleImg = $(el).attr("src")
                let singleImg = $.html(el)
                images = images + " " + singleImg
                /*download({
                    imgs: [
                        {uri:singleImg}
                    ],
                    dest:"./downloads"
                })
                .then((info)=>{
                    console.log("download complete", info)
                    //process.exit(1)
                })*/
              });
              htmlContent = '<html> <center> ' + images + '</center> </html>';
              fs.writeFile(`./${chapter}.html`, htmlContent, (error) => 
              { if(error){
                  console.log(error)
              }
              res.download(`./${chapter}.html`)
            })
              
        }
    })

})

app.listen(5000)


