import User from "../model/user-schema.js";
import bcrypt, { hash } from 'bcrypt';
import 'dotenv/config.js';
const saltRounds=10;
export async function userSignup(req,res){
    try {
        const exist=await User.findOne({email:req.body.email});
       
        if(exist){
            return res.status(401).json({message:'User already exist'});
        }else{
                const user=req.body;
                const hash=bcrypt.hashSync(user.password, saltRounds)
                const newUser=new User({
                firstname:user.firstname,
                lastname:user.lastname,
                email:user.email,
                mobilenumber:user.mobilenumber,
                password:hash
            });
        
            await newUser.save();
            res.status(200).json({message:user});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message:error.message});
    }

}

export async function userLogin(req,res){
    try {
        const username=req.body.username;
        const password=req.body.password;

        let user=await User.findOne({email:username})
           
        if(user){
            const isHash=bcrypt.compareSync(password, user.password);
       
            if(isHash){
                return res.status(200).json({userData:user});
            }else{
                return res.status(401).json('Incorrect Password');
            }
            
            
        }else{
            return res.status(404).json('User does not exist');
        }
   
        
    } catch (error) {
        res.status(500).json(error.message);
        
    }
}