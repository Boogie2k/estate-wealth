import { Request, Response } from 'express'

const userRoutes = require('./route/user_route')
const propertyRoutes = require('./route/properties_route')
const PropertiesDashboardRoutes = require('./route/properties_dashboard_route')
const setUser = require('./middleware/setUser')
const authUser = require('./middleware/authUser')
const {setDashboard, authDashboard} = require("./middleware/setDashboard")

const express = require('express')
const app = express()
const connect = require("./db/connect");
require("dotenv").config();
 

app.use(express.json()) 
app.use(setUser)
app.get('/', (req:Request, res:Response) => {
res.send('Hello World!')
})

app.use('/api/properties', propertyRoutes)
app.use('/api/users',  userRoutes)
app.use('/api/dashboard', authUser, PropertiesDashboardRoutes)






const start = async () => {
    const port =  3000
    try {
        connect(process.env.MONGO_URL) 
app.listen(port, () => {
console.log(`Server running on http://localhost:${port}`)
})
    } catch (error) {
         
console.log(error)
    }

}

start()