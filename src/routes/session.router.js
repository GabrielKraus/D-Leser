import { Router } from "express";
import userService from "../models/Users.js";
import { createHash, isValidPassword } from "../utils.js";
import passport from 'passport';

const router = Router()

router.post('/register',passport.authenticate('register', {failureRedirect: '/api/sessions/registerfail'}), async (req, res) => {
    res.send({status: "success", payload: req.user._id})
})

router.get('/registerfail', async(req, res)=>{
    console.log("Register failed");
    res.status(500).send({status:"error",error:"Register failed"})
})

router.post('/login', passport.authenticate('login', {failureRedirect:'/api/sessions/loginfail'}), async (req, res) => {
    req.session.user = {
        nombre: req.user.nombre,
        email: req.user.email,
        id: req.user._id
    };

    res.send({status:"success", payload: req.user._id})
})
router.get('/loginfail',(req,res)=>{
    console.log("login failed");
    res.send({status:"error",error:"Login failed"})
})

router.get('/logout', async (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).send("error");
        res.send({status:"success"})
    })
})

export default router;