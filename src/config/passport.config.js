import passport from 'passport';
import local from 'passport-local';
import userService from '../models/Users.js';
import { createHash, isValidPassword } from '../utils.js';

const LocalStrategy = local.Strategy;

const initializePassport = () => {
    passport.use('register', new LocalStrategy({ passReqToCallback: true, usernameField: 'email' }, async (req, email, password, done) => {

        try {
            const { nombre, apellido, edad } = req.body;
            if (!nombre || !apellido || !email || !password || !edad) {
                return done(null, false)
            }

            let exist = await userService.findOne({ email: email })
            if (exist) {
                return done(null, false)
            }

            let user = {
                nombre,
                apellido,
                email,
                edad: edad,
                password: createHash(password)
            }
            const result = await userService.create(user);

            return done(null, result)
        } catch (error) {
            return done(error)
        }
    }))

    passport.use('login', new LocalStrategy({usernameField:"email"}, async(email, password, done)=>{
        try {
            if (!email || !password) {
                return done(null, false)
            }
    
            const user = await userService.findOne({ email: email })
            if (!user) {
                return done(null, false)
            }
            if (!isValidPassword(user, password)) {
                return done(null, false)
            }
            
            return done(null, user)
        } catch (error) {
            return done(error)
        }
    }))



    passport.serializeUser((user, done) => {
        done(null, user._id)
    })
    passport.deserializeUser(async (id, done) => {
        let result = await userService.findOne({ _id: id })
        return done(null, result)
    })
}

export default initializePassport;