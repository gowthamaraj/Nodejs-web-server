let http = require('http')
let fs= require('fs')
let path = require('path')

let server = http.createServer(function(req,res) {
    console.log('received request @ :'+req.url)
    fs.readFile(path.join(__dirname,'server.log'), (err, data) => {
        if (err) throw err;
        fs.writeFile(path.join(__dirname,'server.log'),`${data} \nreceived request @ : ${req.url}`, 'utf8', (err, data) => {
            if (err) throw err;
        })
      });
    
    if(req.url === '/home' || req.url ==='/'){
        res.writeHead(200,{'content-type':'text/html'})
        fs.createReadStream(path.join(__dirname,'index.html')).pipe(res)
    }
    else if(req.url ==='/api'){
        let data = {
            name:'red ranger',
            squad:'jungle fury',
            power:'90'
        }
        res.writeHead(200,{'content-type':'application/json'})
        res.end(JSON.stringify(data))
    }
    else{
        res.writeHead(404,{'content-type':'text/html'})
        fs.createReadStream(path.join(__dirname,'404.html')).pipe(res)
    }
})

server.listen(3000)