const Model = require('../Model/').objects;

const profileController = {
    createProfile: async (req, res)=> {
        // console.log("req=",req.body, req.headers, req.params);
        let r = await Model.profile.createProfile(req.body);
        if(r.error){return res.status(404).set('Content-Type', 'application/json').send(r.error);
        } 
        return res.status(200).set('Content-Type', 'application/json').send(r);
    }
}

module.exports = profileController;