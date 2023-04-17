import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const index = () => {

  const router = useRouter()
  const { id } = router.query
  const initialValues = { first_name: '', last_name: '', email: '' }
  const [form, setForm] = useState(initialValues)
  const [isEdit, setIsEdit] = useState<boolean>(false)


  useEffect(() => {
    fetch(`/api/${id}`, {
      method: 'GET'
    })
      .then(res => res.json())
      .then(users => setForm(users))
  }, [])

  const editHandler = (e) => {
    e.preventDefault();
    setIsEdit(true)
  }

  const saveHandler = (e) => {
    e.preventDefault();
    console.log(form,"dataaaaaaaaaaaaa")
    try {
      fetch(`/api/${id}`, {
        method: 'PUT',
        body: JSON.stringify(form),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
        .then(res => res.json())
        .then(res => console.log(res,"resultttttttt"));
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <div className='bg-zinc-200 flex justify-center items-center h-screen'>
        <div className='bg-white pl-10 h-[500px] flex flex-col pt-10 w-[350px]'>
          <form method='POST'>
            <div>
              <p className='font-semibold text-2xl underline pl-10 '>Update User</p>
            </div>
            <div className='mr-5 pt-5'>
              <p className='text-zinc-600 font-semibold pb-1'>First Name</p>
              {
                isEdit ? <input
                  className='h-10 px-5 border border-sm  rounded-md'
                  type="text"
                  name="first_name"
                  value={form.first_name}
                  onChange={(e) => setForm({ ...form, first_name: e.target.value })}
                />
                  :
                  <input
                    className='h-10 px-5 border border-sm  rounded-md text-gray-600'
                    type="text"
                    name="first_name"
                    value={form.first_name}
                    disabled
                  />
              }
            </div>
            <div className='mr-5 pt-5'>
              <p className='text-zinc-600 font-semibold pb-1'>Last Name</p>
              {
                isEdit ? <input
                  className='h-10 px-5 border border-sm  rounded-md'
                  type="text"
                  name="last_name"
                  value={form.last_name}
                  onChange={(e) => setForm({ ...form, last_name: e.target.value })}
                />
                  :
                  <input
                    className='h-10 px-5 border border-sm text-gray-600 rounded-md'
                    type="text"
                    name="last_name"
                    value={form.last_name}
                    disabled
                  />
              }
            </div>
            <div className='mr-5 pt-5'>
              <p className='text-zinc-600 font-semibold pb-1'>Email</p>
              {
                isEdit ? <input
                  className='h-10 px-5 border border-sm  rounded-md'
                  type="text"
                  name="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                  :
                  <input
                    className='h-10 px-5 border border-sm text-gray-600 rounded-md'
                    type="text"
                    name="email"
                    value={form.email}
                    disabled
                  />
              }
            </div>
            <button
              onClick={editHandler}
              className='mt-6 px-3  mr-2 bg-red-400 h-10 rounded-md hover:bg-red-600 duration-300 text-white font-semibold'>
              Edit
            </button>
            <button
              onClick={saveHandler}
              className='mt-6 px-3 bg-blue-400 h-10 rounded-lg hover:bg-blue-600 duration-300 text-white font-semibold'>
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default index