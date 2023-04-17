import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient()

const handler = async (req: NextApiRequest,res: NextApiResponse) => { 

  //get All Users
  if (req.method === "GET") {
      const loggedinUser = await prisma.user.findMany();
      res.status(200).json(loggedinUser);
  }    





























  
  //CREATE USER
  // if (req.method === "POST"){
  //   const createUser = await prisma.user.create({
  //     data: {  
  //     ...req.body
  //     },
  //   })
  //   res.status(200).json({msg:"User Created!!"});
  // }
}





export default handler;

