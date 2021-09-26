const http = require('http');
const port = 5000;
const fs = require('fs');
const axios = require('axios');

const server = http.createServer( (req, res) => {

    res.writeHead(200,{'Content-Type': 'text/html'})
    res.setHeader('Access-Control-Allow-Origin', '*')

    fs.readFile('webpage.html', function (error, data) {
        if(error){
            res.write(404);
            res.write('Error: File not found')
        }
        else{
            res.write(data)
        }
        res.end()
    })

    res.write('TestPage1')
    res.end();
})



server.listen(port, function(error){
    if(error){
        console.log('Error', error)
    }
    else{
        console.log('Server listening on port ' + port)
    }
})