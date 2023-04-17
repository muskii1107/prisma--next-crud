import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface FormData{
    first_name:string;
    last_name:string;
    email:string
  }

const index = () => {
    const [allUsers, setAllUsers] = useState([]);

    useEffect(() => {
        fetch(`/api/user`, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(users => setAllUsers(users))
    }, [])
    return (
        <div className='flex justify-center items-center p-10 w-full h-screen bg-blue-100'>
            <div className='rounded-md w-4/6 h-5/6 bg-white p-10'>
                <p className='font-bold text-2xl font-serif mb-2' >Users</p>
                <div className='grid grid-cols-3'>
                    {allUsers && allUsers.length > 0 ? allUsers.map((user, key) => (
                        <CardComponent user={user} key={key} />
                    )) : null}
                </div>
            </div>
        </div>
    )
}
function CardComponent({ user }) {
    const router = useRouter();

    const [form, setForm] = useState<FormData>({ first_name:"", last_name:'', email:''})
    
    const viewProfilehandler = (id)=> {
        router.push(`/user/${id}`);
        console.log(user,"user")
        setForm({first_name:user.first_name, last_name:user.last_name , email: user.email})
    }

    const deleteHandler = (id) => {
        try {
            fetch(`/api/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(msg => console.log(msg));
        } catch (error) {
            console.log(error)
        }
    }
    return <div className='relative w-60 h-36 hover:border hover:border-blue-300 rounded-lg p-3 flex hover:shadow-lg'>
        <img className='mr-3 w-20 h-20 border border-black rounded-full object-cover' src="https://images.unsplash.com/photo-1502323777036-f29e3972d82f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Z2lybCUyMHByb2ZpbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60" alt="" />
        <div className='mt-3'>
            <p className='font-semibold'>{user?.first_name}{" "}{user?.last_name}</p>
            <p className='text-[12px]  text-gray-700'>{user?.email}</p>
        </div>
        <div className='absolute mt-16 ml-20 w-full h-20 px-2'>
            <button
                onClick={() => viewProfilehandler(user.id)}
                className="mr-1 cursor-pointer text-[10px] bg-transparent hover:bg-green-500 text-blue-500 font-semibold hover:text-white p-1 border border-blue-500 hover:border-transparent rounded">View Profile
            </button>
            <button
                onClick={() => deleteHandler(user.id)}
                className="text-[10px] bg-transparent hover:bg-red-500 text-blue-500 font-semibold hover:text-white p-1 px-2 border border-blue-500 hover:border-transparent rounded">Delete
            </button>
        </div>
    </div>
}

export default index