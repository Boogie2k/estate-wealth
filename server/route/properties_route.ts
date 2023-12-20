const{getProperties, getSingleProperty, createProperty, updateProperty, deleteProperty} = require('../controller/properties_controller')   
const authUser = require('../middleware/authUser')
const authRole = require('../middleware/authRole')
const upload =require("../middleware/upload")
const app = require('express')


const router = app.Router()



router.get('/', getProperties)
router.get('/:id', getSingleProperty)
router.post('/', authUser, authRole('admin'), upload.single('image'),  createProperty)    
router.patch('/:id', authUser, authRole('admin'), upload.single('image'), updateProperty)  
router.delete('/:id', authUser, authRole('admin'), deleteProperty)   

module.exports=router
