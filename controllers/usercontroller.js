
const {userModel} =require( "../model/usermodel")

const  Signup= async (req , res)=>{
    try{ 
       const {email , password , DateofBirth}=req.body
       console.log(userModel)
     const hashedpassword=await bcrypt.hash(password , 10)
       const existinguser=await userModel.findOne({email:email})
     if(existinguser){
        return   res.status(400).send("User Already Exists ")
     }
  const newUser=  await userModel.create({
         email:email,
         password:hashedpassword,
         DateofBirth:DateofBirth
    })
    
 return res.status(201).json({message: newUser })
 
 }
 
    catch(error){
    return res.status(500).send(message=error.message)
    }
 }

const Login=async (req , res)=>{
  try{const {email , password}=req.body

  const existingUser= await userModel.findOne({email})
  if(!existingUser){return res.status(400).send("account doesn't exist")}

  const verifyingpassword=await bcrypt.compare(password , existingUser.password)

  if(!verifyingpassword){return res.status(400).send("invalid credential")}
   const token=jwt.sign({id:existingUser._id} ,jwt_secret)
   res.status(200).json({token})}
   catch(error){
      res.json({error:error})
   }
}

module.exports={Signup,Login}