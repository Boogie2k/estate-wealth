import  {NextFunction, Request, Response} from "express"
const express = require('express')
const multer  = require('multer')
const path = require('path')


const storage = multer.diskStorage({
  destination: function (req:Request, file:any, cb:any) {
    cb(null, 'C:/Users/Boogie/Desktop/web_projects/real_estate/server/uploads')
  },
  filename: function (req:any, file:any, cb:any) {
    let ext = path.extname(file.originalname)
    const uniqueSuffix = Date.now() 
    cb(null, file.fieldname + '-' + uniqueSuffix+ext)
  }
})




function fileFilter (req:any, file:any, cb:any) {

if(file.mimetype=="image/png"||
    file.mimetype=="image/png"||
    file.mimetype=="image/jpg"||
    file.mimetype=="image/jpeg"||
    file.mimetype=="image/webp"
){
    cb(null, true)
} else{
    cb(null, false)

}


  //  if something goes wrong:
    cb(new Error('I don\'t have a clue!'))

}

const limits ={
    fileSize: 1024*1024*2
}

const upload = multer(
    { storage: storage },
 //   fileFilter, 
    limits
    )

    module.exports=upload