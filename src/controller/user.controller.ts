import { role } from "@prisma/client";
import {prisma} from "../config/db";

import {Request,Response} from "express";

// add new user
export const createNewUser=async(req: Request, res: Response)=>{
    try {
        const user=req.body;
await prisma.userm.create({

    data: user,
})
res.json({
    message:"user created successfully"
})
    } catch (error) {
        console.log(error);
        
        
    }
};

// getAllusers
export const getAllUsers = async(req: Request, res: Response)=>{
    const users = await prisma.userm.findMany();
    res.json(users);

};

// find user By Id
export const getuserById = async(req: Request, res: Response)=>{
    const user = await prisma.userm.findUnique({


        where: { id: 
            req.params.id }

    });
    if (user == null) {
        res.json({"message":"user not found"});

    }else{

        res.json({"message":user});

    }
    };

    // find user by email
export const getuserByEmail = async(req: Request, res: Response)=>{
    try {
        
        const user = await prisma.userm.findUnique({


            where: { email: 
                req.params.email }
    
        });
        if (user == null) {
            res.json({"message":"user not found"});
    
        }else{
    
            res.json({"message":user});
    
        }
        
    } catch (error) {
        console.log(error);
        
    }
}

     // age and return the user with older than this age
export const getUserAgeOlder = async(req: Request, res: Response)=>{
    const user = await prisma.userm.findMany({


        where: {
            age: { gt: Number(req.params.age) }
        }


    });
    if (user == null) {
        res.json({"message":"There is no older users"});

    }else{

        res.json({"message":user});

    }
    };
    //get number of users that have a specific role
    
    export const getNumberUsersSpecificRole=async(req: Request, res: Response)=>{
        try {
            const rol = await prisma.userm.count({


                where: { 
                    role: req.params.role.toUpperCase() as role 
                }
        
        
        
            });
    res.json(rol)
        } catch (error) {
            console.log(error);
            
            
        }
    };

    // username and password and check if it's correct or not

    export const CheckUserNameAndPassword = async(req: Request, res: Response)=>{
            const user = await prisma.userm.findFirst({
        
                where:{
                    username:req.body.username,
                    password:req.body.password,

                }
            });
            if (user == null) {
                res.json({"message":"password or username is not correct"});
        
            }else{
        
                res.json({"message":user});
        
            }
            };



            // update user Password
export const updatePassword=async(req: Request, res: Response)=>{
    try {
        const { id } = req.params;
        const { passwordNew } = req.body;
    
        const user = await prisma.userm.update({

            where: { id },
            data: { password: passwordNew }
    
    
        });
    
        res.json(user);
        
    }
   catch (error) {
    console.log(error);
  }

};


export const getUserJoined=async(req: Request, res: Response)=>{
    try {
        if (!req.body.year) {

            return res.json({ error: "is not correct" })
        }
        const user = await prisma.userm.findUnique({
            where: {
    
                id: req.params.id
    
            },
    
        });
        if (user) {
    
            if (user.joiningYear == req.body.year) {
    
                return res.json({ sameYear: true })
            }
            else { return res.json({ sameYear: false }) }
    
        }
        else {
            res.json({ error: "is not correct" })
    
        }
    
    }
   catch (error) {
    console.log(error);
  }

};

// all the users who joined in this date or after
export const getAllUsersYear = async(req: Request, res: Response)=>{
  try {
    const user = await prisma.userm.findMany({
        where: {
            joiningYear: {
                gte: req.params.year,
            },
        },
    });

    res.json(user);
    
  } catch (error) {
    console.log(error);
    
  }

};