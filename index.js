const expressJS = require("express");
const app = expressJS();
const cors = require('cors')
const serve = require("./serve");
const api = require("./api")
const CONFIG = {
    serve: false
};

function handoff(){
    if(!CONFIG.serve) app.use(cors());
    app.use(expressJS.json());
    app.use("/Smart-Greenhouse/api",api);
    if(CONFIG.serve) app.use(serve);
    else app.use("/Smart-Greenhouse",(req,res)=>{
        res.status(403);
        res.json({error:true,message:"This server only serve API."});
    });
    app.listen(8000);
}

function startUpSequence(args = []){
    if(args.includes("-serve")) CONFIG.serve = true;
    return handoff();
}

startUpSequence(process.argv.slice(2));
