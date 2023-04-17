import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient()

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    const userId = req.query.id
    

    if (req.method === "GET") {
        console.log(userId, "userId")
        const user = await prisma.user.findUnique({
            where: { id: Number(userId) },
        })
        console.log(user, "user")
        res.status(200).json(user);
    }

    //DELETE USER
    if (req.method === "DELETE") {
        const deletedUser = await prisma.user.delete({
            where: { id: Number(userId) },
        })
        res.status(200).json(deletedUser);
    }

    //UPDATE USER
    if (req.method === "PUT") {
        const { first_name, last_name, email } = req.body
        console.log(req.body,typeof userId, 'qweqwqrwerwwrww======1')

        const updateuser = await prisma.user.update({
            where: { id: Number(userId) },
            data: {
                email:email,
                first_name: first_name,
                last_name: last_name,
            },
        })
        console.log(updateuser, '======2')
        res.status(200).json({ data: req.body });
    }
}

export default handler;

