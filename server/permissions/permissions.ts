
interface User{
    role:string,
    _id:string
}



interface dashboard{
userID:string,
property:object,

}

const canViewDashboard =(user:User, dashboard:any)=>{
    return user.role == "admin"||
    dashboard.investor._id == user._id


} 

const scopedDashboard = (user:User, dashboard:any)=>{
    if(user.role == "admin") {
    dashboard.map((dashboard:any)=> console.log({dashboard:dashboard.investor._id}))

        return dashboard
    }

    if(dashboard.investor){

        console.log({user:user._id, dashboard:dashboard.investor._id})
    }

    const investorDashboards = dashboard.filter((dashboard:any)=> { 
        const investorID:Number = parseInt(dashboard.investor._id)
        const userID:Number = parseInt(user._id)
        
        
    return   investorID === userID}) 

    return investorDashboards


}

module.exports= { canViewDashboard, scopedDashboard}