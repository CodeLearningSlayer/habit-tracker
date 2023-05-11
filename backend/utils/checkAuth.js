import jwt from "jsonwebtoken"

export const checkAuth = (req, res, next) => {
    const token = (req.headers.authorization || "").replace(/Bearer\s?/, '');
    console.log("token = ", token);
    if (token){
        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.userId = decoded.userId;
            console.log("id = ", req.userId);
            next();
        } catch (error) {
            return res.json({
                message: 'Нет доступа ' + error 
            })
        } 
    } else {
        return res.json({
            message: 'Нет доступа'
        })
    }
}