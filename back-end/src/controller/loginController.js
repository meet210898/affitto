const User = require('../model/loginModel');

const userRegister = async (req,res) => {
    const user = new User(req.body);
    try {
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({User,token});
    } catch (e) {
        res.status(400).send({error:e.message});
    }
};

const userLogin = async (req,res) => {
    try {
        const userLogin = await User.findByCredentials(req.body.email,req.body.password);
        const token = await userLogin.generateAuthToken();
        res.status(200).send({token});
    } catch (e) {
        res.status(400).send({error:e.message});
    }
};

module.exports = {userRegister,userLogin};