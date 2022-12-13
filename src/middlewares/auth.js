// export default function auth(req, res, next) {
//     if (req.session.login) {
//         next();
//     } else {
//         return res.status(401).send('No autorizado');
//     }
// }



//testing
export default function auth(req, res, next){
    next();
}