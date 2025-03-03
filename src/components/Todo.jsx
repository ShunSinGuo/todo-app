import React, { useEffect, useRef, useState } from "react"
import Todoitems from "./todoitems"

import calender from "../assets/calender.png"

const Todo = () => {

    const [todoList, setTodoList] = useState(localStorage.getItem("todos")?JSON.parse(localStorage.getItem("todos")):[]);

    const inputRef = useRef()

    const [isDarkMode, setDarkMode] = useState(localStorage.getItem("theme")?JSON.parse(localStorage.getItem("theme")):"lightMode")

    const add = () => { 
        const inputText = inputRef.current.value.trim()

        if(inputText === "") {
            return null
        }

        const newTodo = {
            id: Date.now(),
            text: inputText,
            isComplete: false,
        }
        setTodoList((prev) => [...prev, newTodo])
        inputRef.current.value = "";
    }

    const remove = (id) => {
        setTodoList((prevTodo) => {
            return prevTodo.filter((todo) => todo.id !== id)
        })
    }

    const toggle = (id) => {
        setTodoList((prevTodo) => {
            return prevTodo.map((todo) => {
                if(todo.id === id)
                    return {...todo, isComplete: !todo.isComplete}  
                return todo  
            })
        })
    }
    
    const darkSwitch = () => {
        isDarkMode==="lightMode"?setDarkMode("darkMode"):setDarkMode("lightMode")
    }

    useEffect(() => {
        localStorage.setItem("theme", JSON.stringify(isDarkMode))
        if (isDarkMode === "darkMode") {
            document.documentElement.classList.add("dark")
        } else {
            document.documentElement.classList.remove("dark")
        }
    }, [isDarkMode])
    
    useEffect(()=>{
        localStorage.setItem("todos", JSON.stringify(todoList))
    },[todoList])
 
    return (
        <>
            <div className="transition-colors bg-white dark:bg-gray-800 place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl">
                {/* ----- toggleSwitch ----- */}
                <div 
                    onClick={darkSwitch} 
                    className="absolute right-18 top-10 transition-colors bg-white dark:bg-gray-800 w-15 h-8 rounded-full cursor-pointer"
                >
                    <button className={`
                        bg-gray-600 dark:bg-white
                        after:content-[''] after:w-6 after:h-6 after:rounded-full after:absolute after:top-1 after:left-1
                        after:transition-transform after:duration-300 after:cursor-pointer 
                        after:bg-gray-950 dark:after:bg-white ${isDarkMode==="darkMode" ? 'after:translate-x-7' : ''}
                    `}></button>
                </div>

                {/* ----- title ----- */}
                <div className="flex items-center gap-2">
                    <img src={calender} className="w-8" alt="calender" />
                    <h1 className="text-2xl font-mono transition-colors text-gray-800 dark:text-white">To-Do List</h1>
                </div>

                {/* ----- input box ----- */}
                <div className="flex items-center mb-7 mt-5 transition-colors bg-gray-200 dark:bg-gray-700 rounded-full">
                    <input 
                        ref={inputRef} 
                        className="bg-transparent border-0 outline-none flex-1 h-10 pl-6 pr-2 placeholder:text-slate-600 dark:placeholder:text-slate-300" 
                        type="text" 
                        placeholder="Add your task"
                    />
                    <button 
                        onClick={add} 
                        className="border-none rounded-full bg-cyan-500 w-32 h-10 text-white text-lg font-medium cursor-pointer transition-colors hover:bg-cyan-600"
                    >
                        ADD +
                    </button>
                </div>

                
                {/* ----- todo list ----- */}
                <div>
                    {
                        todoList.map((item, index) => {
                            return <Todoitems key={index} text={item.text} id={item.id} isComplete={item.isComplete} remove={remove} toggle={toggle}/>
                        })  
                    }
                </div>
            </div>
        </>
    )
}

export default Todo