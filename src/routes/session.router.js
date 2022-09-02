import { Router } from "express";
import userService from "../models/Users.js";

const router = Router()

router.post('/register', async (req, res)=>{
    
    const{nombre, apellido, email, password, edad} = req.body;
    if(!nombre || !apellido || !email || !password || !edad){
        return res.status(400).send({error: "Incomplete values"})
    }
    let user = {
        nombre,
        apellido,
        email,
        edad:edad,
        password
    }
    try{
        const result = await userService.create(user);
        res.send({status: "success", payload: result})
    }catch(error){
        res.status(500).send({error:error})
    }
})

router.post('/login', async(req, res)=>{
    try{
        const{email, password} = req.body
        if(!email || !password){
            return res.status(400).send({error: "Incomplete values"})
        }
        const user = await userService.findOne({$and:[{email:email},{password: password}]},{nombre: 1, apellido: 1, email: 1})
        if(!user){
            return res.status(400).send({error: "Usuario no encontrado"})
        }
        req.session.user = user;
        res.send({status: "success", payload: result})
    }catch(error){
        res.status(500).send({error:error})
    }
})

router.get('/logout',async(req,res)=>{
    req.session.destroy(err=>{
        if(err) return res.status(500).send("error");
        res.send("listo")
    })
})

export default router;