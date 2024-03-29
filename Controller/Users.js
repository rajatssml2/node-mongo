const Model = require('../Model/').objects;

const userController = {
    create: async (req, res)=> {
        // console.log("req=",req.body, req.headers, req.params);
        let r = await Model.user.create(req.body);
        if(r.error){return res.status(404).set('Content-Type', 'application/json').send(r.error);
        } 
        return res.status(200).set('Content-Type', 'application/json').send(r);
    },
    getUsers: async (req,res)=>{
        let r = await Model.user.getUsers();
        if(r.error){
            return res.status(404).set('Content-Type', 'application/json').send(r.error);
        } 
        return res.status(200).set('Content-Type', 'application/json').send(r);
    },
    login: async (req,res)=>{
        let r = await Model.user.login(req.body);
        if(r.error){
            return res.status(404).set('Content-Type', 'application/json').send(r.error);
        } 
        return res.status(200).set('Content-Type', 'application/json').send(r);
    }
}

module.exports = userController;