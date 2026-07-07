import jwt from 'jsonwebtoken'

export const authMiddleare=(req,res,next)=>{
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token provide" });
  }

  try{
    const token= authHeader.split(" ")[1];
    const decode= jwt.verify(token, process.env.JWT_SECRET);

    req.user=decode
    next();
  }catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}