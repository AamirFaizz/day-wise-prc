
import React, { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {

  const [note, setnote] = useState([])

  function fetchnote() {
    axios.get('http://localhost:3000/notes')
      .then(res => setnote(res.data.note))
  }

  useEffect(() => {
    fetchnote()
  }, [])

  function submitthandle(e) {
    e.preventDefault()

    const { title, description } = e.target.elements

    axios.post('http://localhost:3000/notes', {
      title: title.value,
      description: description.value
    })

      .then(res => {
        console.log(res.data)
        fetchnote()
        e.target.reset()
      })
  }

  function deletehandle(noteid) {
    axios.delete('http://localhost:3000/notes/' + noteid)
      .then(res => {
        console.log(res.data)
        fetchnote()
      })
  }


  return (
    <>
      <div>
        <form onSubmit={submitthandle}>
          <div className='flex flex-col md:flex-row gap-4 p-6 md:px-6 py-5 w-fit max-w-fit'>
            <input required className='border-2 px-3 py-2 text-xl rounded' type="text" name='title' placeholder='enter title' />

            <input required className='border-2 px-3 py-2 text-xl rounded' type="text" name='description' placeholder='enter description' />
            <button className='bg-blue-500 px-3 py-2 text-xl text-white rounded cursor-pointer'>submit</button>
          </div>
        </form>
      </div>

      <div className='flex flex-col md:flex-row gap-4 px-6'>
        {note.map(e => {
          return <div className='bg-amber-800 text-white p-3 w-fit max-w-fit rounded' key={e._id}>

            <h1 className='text-2xl capitalize md:text-3xl'>{e.title}</h1>

            <p className='text-lg capitalize'>{e.description}</p>

            <button className='bg-blue-500 px-4 py-1 rounded cursor-pointer mt-2' onClick={() => { deletehandle(e._id) }}>delete</button>
          </div>
        })}
      </div>
    </>
  )
}

export default App
