import jwt from "jsonwebtoken";


export async function restrict(req:any, res:any, next:any){
    try {
        const authError = {message: "Invalid credentials"};

        const token = req.headers.authorization;//I decided to go with a header instead of cookie because we were taught to use headers in our axios with auth unit
        if(!token) return res.status(401).json(authError);

        //decode token, resign payload, and check if signature is valid
        //@ts-ignore
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {//todo: possible undefined string|und for env var
            if(err) return res.status(401).json(authError);
            req.token = decoded;
            next();
        });
    } catch (e) {
        console.log(e.stack);
        next(e);
    }
}