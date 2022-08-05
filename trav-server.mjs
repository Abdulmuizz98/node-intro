import fs from "fs"
import http from "http"
import path from "path"
import {fileURLToPath} from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const PORT = process.env.PORT || 8000;

const server = http.createServer((req, res) => {
    // if(req.url == "/"){
    //     fs.readFile(path.join( __dirname, "/public", "home.html"), (err, data) => {
    //         console.log(__dirname)
    //         if (err) throw err;

    //         res.writeHead(200, {"Content-Type": "text/html"});
    //         res.end(data)
    //     })
    // }
    // if(req.url == "/about"){
    //     fs.readFile(path.join( __dirname, "/public", "about.html"), (err, data) => {
    //         console.log(__dirname)
    //         if (err) throw err;

    //         res.writeHead(200, {"Content-Type": "text/html"});
    //         res.end(data)
    //     })
    // }
    // if(req.url == "/api/users"){

    //     const users = [{first: "boy"}, {second: "girl"}]
        
    //     res.writeHead(200, {"Content-Type": "application/json"});
    //     res.end(JSON.stringify(users))
    // }

    let filename = path.join(__dirname, "/public", req.url == "/" ? "home.html" : req.url)
    let extname = path.extname(filename);
    let contentType = "text/html";

    switch(extname){
        case ".json":
            contentType = "application/json"
            break;
        case ".css":
            contentType = "text/css"
            break;
        case ".js":
            contentType = "text/js"
            break;
        case ".png":
            contentType = "image/png"
            break;
        case ".jpg":
            contentType = "image/jpg"
            break;
    }
    
    fs.readFile(filename, (err, data) => {
        if(err) {
            if(err.code == "ENOENT"){
                fs.readFile(path.join(__dirname, "/public", "404.html"), (err, data) => {
                    res.writeHead(404, {"Content-Type": contentType})
                    res.end(data)
                })
            }else{
                //Some server error
                res.writeHead(500)
                res.end(`Server Error: ${err.code}`)
            }

        }else{
            res.writeHead(200, {"Content-Type": contentType})
            res.end(data)
            
        }
    })

})



server.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
})
