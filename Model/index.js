const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;
const jwt = require('jsonwebtoken');
const authToken = require('../utility/auth');

var User, Profile;


const model = {
    connect: async () => {
        let mongoUrl = 'mongodb+srv://rajat_143:lovingBOY143@cluster0-q3fe1.mongodb.net/test?retryWrites=true&w=majority';
        mongoose.connect(mongoUrl, { useNewUrlParser: true });
        mongoose.set('useCreateIndex', true);
        let db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', () => {
            console.log("connection created");

            model.create.user();
            model.create.profile();
        });
    },
    create: {

        /**
        * @description Initial id creator for all models.
        */
        user: async () => {
            let schema = new mongoose.Schema({
                name: { type: String, required: true },
                email: { type: String, unique: true, required: true },
                password: { type: String, required: true }
            });
            User = mongoose.model('User', schema);
        },
        profile: async () => {
            let schema = new mongoose.Schema({
                name: { type: String, required: true },
                email: { type: String, unique: true, required: true },
                contactNo: { type: String, required: true },
                alternateNo: { type: String, required: false },
                address_1: { type: String, required: true },
                address_2: { type: String, required: false },
                city: { type: String, required: true },
                state: { type: String, required: true },
                country: { type: String, required: true },
                pin: { type: String, required: true }
            });
            Profile = mongoose.model('Profile', schema);
        }
    },
    objects: {
        user: {
            create: async (param) => {
                let token = await authToken.createToken(param);
                if(token) {
                    if(authToken.verifyToken(token)) {
                        try { r = await User.create(param); }
                        catch(e) { return { error: { type: 'error', text: e.message } }; }
                        if(!r) { return { error: { type: 'error', text: 'can\'t create user!' } }; }
                        return { message: { type: 'register success' }, data: {token: token, user: r} };
                    } else {
                        { return { error: { type: 'error', text: 'token is not valid' } }; }
                    }
                } else {
                    { return { error: { type: 'error', text: 'token not found' } }; }
                }
                
            },
            login: async (param) => {
                console.log("param-->",param);
                let token = await authToken.createToken(param);
                if(token) {
                    if(authToken.verifyToken(token)) {
                        try { r = await User.findOne({email: param.email}); }
                        catch(e) { return { error: { type: 'error', text: e.message } }; }
                        if(!r) { return { error: { type: 'error', text: 'can\'t create user!' } }; }
                        if(r) {
                            if (r.password === param.password) {
                                return { message: { type: 'login success' }, data: {token: token, user: r} };
                            }
                            else {
                                return { error: { type: 'error', text: 'password is not valid' } };
                            }
                        }
                        
                    } else {
                        return { error: { type: 'error', text: 'token is not valid' } };
                    }
                } else {
                    return { error: { type: 'error', text: 'token not found' } };
                }
            },
            getUsers: async ()=> {
                try {
                    r = await User.find({});
                }
                catch(e) {
                    return { error: { type: 'error', text: e.message } }; 
                };
                return { message: { type: 'success' }, data: r };
            }
        },
        profile: {
            createProfile: async (param) => {
                let token = await authToken.createToken(param);
                if(token) {
                    if(authToken.verifyToken(token)) {
                        try { r = await Profile.create(param); }
                        catch(e) { return { error: { type: 'error', text: e.message } }; }
                        if(!r) { return { error: { type: 'error', text: 'can\'t create user!' } }; }
                        return { message: { type: 'profile created successfuly' }, data: {token: token, user: r} };
                    } else {
                        { return { error: { type: 'error', text: 'token is not valid' } }; }
                    }
                } else {
                    { return { error: { type: 'error', text: 'token not found' } }; }
                }
                
            },
        }
    }
};

module.exports = model ;