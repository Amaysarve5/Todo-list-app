import { useState } from 'react'
import Navbar from './component/Navbar'
import { v4 as uuidv4 } from 'uuid';
import js from '@eslint/js';
import { useEffect } from 'react';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinish, setShowFinish] = useState(true)

  useEffect(() => {
    let stringtodos = localStorage.getItem("todos")
    if (stringtodos) {
     let todos = JSON.parse(localStorage.getItem("todos"));
     setTodos(todos)
    }
     }, [])
  

  const saveToLS = ()=>{
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    saveToLS()
  }
  const handleEdit = (e, id)=>{ 
    let t = todos.filter(i=>i.id === id) 
    setTodo(t[0].todo)

     let newTodos = todos.filter(items => { return items.id !== id });
    setTodos(newTodos)
    saveToLS()
  }
  const handleDelete = (e, id) => {
    let index = todos.findIndex((items) => {
      return items.id === id;
      
    })

    let newTodos = todos.filter(items => { return items.id !== id });
    setTodos(newTodos)
  }
  const handlechange = (e) => {
    setTodo(e.target.value)
    saveToLS()
  }

  const handleCheckBox = (e) => {
    let id = e.target.name
    let index = todos.findIndex((item) => {
      return item.id === id
    })

    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    console.log(newTodos, todos)
    saveToLS()
  }


  const toggleFinish = (e) => {
    setShowFinish(!showFinish)
    }

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-5 p-5 rounded-xl bg-violet-100 min-h-[80vh] md:w-[50%] w-[95%]">
        <h1 className='font-bold text-center text-3xl mb-5'>iTask - Manage your todos at one place</h1>
        <div className="addTodo">
          <h2 className="font-bold text-xl mb-5">Add a Todos</h2>
          <input onChange={handlechange} value={todo} className='md:w-[86%] w-[100%] rounded-full py-1' type="text" />
          <button onClick={handleAdd} disabled={todo.length<=3} className='bg-violet-400 hover:bg-violet-800 p-4 py-1 font-bold text-white rounded-xl cursor-pointer md:ml-4 md:w-20 w-[100%] mt-3'>Save</button>
        </div>
        <input onChange={toggleFinish} id="show" type="checkbox" checked={showFinish} className='mt-5' />
        <label className='mx-2' htmlFor="show">Show Finished</label> 
        <div className='h-[1px] bg-black opacity-35 w-[90%] mx-auto my-2'></div>
        <h1 className='text-xl font-bold mt-2'>Your todo</h1>
        <div className="todos">
          {todos.length === 0 && <div className='text-lg m-5'>No todos to display</div>}
          {todos.map(items => {

            return (showFinish || !items.isCompleted) && <div key={items.id} className='todo flex justify-between my-5'>

              <div className='flex gap-5'>
                <input name={items.id} onClick={handleCheckBox} type="checkbox" checked={items.isCompleted} id="" />
                <div className={items.isCompleted ? "line-through" : ""}>{items.todo}</div>
              </div>


              <div className="buttons flex h-full flex-col gap-5 text-center">
                <button onClick={(e) => {handleEdit (e, items.id)}} className='bg-violet-400 hover:bg-violet-800 p-3 py-1 font-bold text-white rounded-md mx-6'><FaEdit /></button>
                <button onClick={(e) => { handleDelete(e, items.id) }} className='bg-violet-400 hover:bg-violet-800 p-3 py-1 font-bold text-white rounded-md mx-6'><MdDelete /></button>
              </div>
            </div>
          })}
        </div>

      </div>

    </>
  )
}

export default App
