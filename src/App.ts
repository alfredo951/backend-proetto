import express,{ Request, Response }  from "express"
import dotenv from "dotenv"
import cors from 'cors'

import * as jwt from 'jsonwebtoken'
import { Router } from 'express';
import verifyToken from "./middleware";








const router = Router();









const app = express();

app.use(express.json());
app.use(cors({origin:"http://localhost:5173"}))
// Helpers




app.post("/api/auth/login",(req:Request<{}, {}, {name:string,password:string}, {}, Record<string, any>>,res:Response)=>{

try {
  console.log(req.body);
 if(req.body && req.body.name && req.body.password){
  console.log(req.body.name)
if(req.body.name==="ciao" && req.body.password==="ciao"){

  const token=jwt.sign(
    {name:req.body.name,password:req.body.password,idprofile:"1234"},
    
    "iaffioComanda",
    {
        expiresIn:"24h"
    }
)

console.log(req.body.name,token )

  return res.status(200).json({name:req.body.name, token:token, idprofile:"1234"})
}else{
  return res.status(400).json({message:"invalid credential"})
}
 }else{
  return res.status(400).json({message:"bad request"})
 }
} catch (error) {
  return res.status(500).json({message:"somthing went wrong; please try again"+error})
}



} )





app.use(router.get("/api/component/menu", verifyToken, (_:Request,res:Response)=>{
  console.log("ciao")
    return res.status(200).json([{title:"Home",links:[{name:"wafer", link:"/wafer"}]},{title:"Chisiamo", link:"/chisiamo"},{title:"Wafering",links:[{name:"wafer", link:"/wafer"}]},{title:"Sing",links:[{name:"wafer", link:"/wafer"}]}])
}))







function print (path:any, layer:any) {
    if (layer.route) {
      layer.route.stack.forEach(print.bind(null, path.concat(split(layer.route.path))))
    } else if (layer.name === 'router' && layer.handle.stack) {
      layer.handle.stack.forEach(print.bind(null, path.concat(split(layer.regexp))))
    } else if (layer.method) {
      console.log('%s /%s',
        layer.method.toUpperCase(),
        path.concat(split(layer.regexp)).filter(Boolean).join('/'))
    }
  }
  
  function split (thing:any) {
    if (typeof thing === 'string') {
      return thing.split('/')
    } else if (thing.fast_slash) {
      return ''
    } else {
      var match = thing.toString()
        .replace('\\/?', '')
        .replace('(?=\\/|$)', '$')
        .match(/^\/\^((?:\\[.*+?^${}()|[\]\\\/]|[^.*+?^${}()|[\]\\\/])*)\$\//)
      return match
        ? match[1].replace(/\\(.)/g, '$1').split('/')
        : '<complex:' + thing.toString() + '>'
    }
  }
  
  app._router.stack.forEach(print.bind(null, []))




  dotenv.config()

   app.listen(process.env.SERVER_PORT, ()=>{
        console.log(`server runnning ${process.env.SERVER_PORT} `)
   })

