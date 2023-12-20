import { Request, Response } from 'express'
const Properties = require('../model/properties_model')

interface RequestWithUser extends Request{
  file:any
}

const getProperties = async (req: Request, res: Response) => {

  try {
        const properties = await Properties.find({})
        if(!properties) {
          return res.status(404).json({msg: 'No properties found'})
        }
        res.status(200).json({properties})

  } catch (error) {
    res.status(400).json({error})
  }
}

const getSingleProperty = async (req: Request, res: Response) => {

const {id} = req.params

  const property= await Properties.findById(id)
    
      if(!property){
        return res.status(404).send("Property not found")
      }
console.log(property.property._id)
      res.json(property)
    }   

const createProperty = async (req: RequestWithUser, res: Response) => {
                    const {name,
                          description, 
                          location,
                          propertyValue,          
                          image,             
                          score,                
                          taxes,              
                          propertyValueHistory,
                          initialPropertyValue
                        } = req.body

          const property = await Properties.create({
                                          name, 
                                          description, 
                                          location, 
                                          propertyValue:10000000,                    
                                          image:req.file.path ||'',                   
                                          score,           
                                          initialPropertyValue:propertyValue,
                                          taxes:5.4
                                        })
                                        

                  if(!property){
                      return res.status(404).send("Property not created")
                  }
                    res.json(property)
        }

        

const updateProperty = async (req: Request, res: Response) => {

// Set an interval to update the countdown every second (1000 milliseconds)

        const {id} = req.params
        const {
          name, 
          description, 
          location, 
          propertyValue,      
          image,
          score,    
          taxes
        } = req.body

        const property = await Properties.findByIdAndUpdate(id, {
          name, 
          description, 
          location, 
          propertyValue,    
          image, 
          score, 
          taxes
        }, {new: true})

        if(!property){
          return res.status(404).json('error')
        }

        res.status(200).json(property)
            }

const deleteProperty = async (req: Request, res: Response) => {
              const {id} = req.params
              const property = await Properties.findByIdAndDelete(id)

              if(!property){
                return res.status(404).send("Property not found")
              }
              res.status(200).send("Property deleted successfully")
                }   
  
                module.exports = {getProperties, getSingleProperty, createProperty, updateProperty, deleteProperty}