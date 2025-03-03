import React from "react";
import tick from '../assets/tick.png'
import notick from '../assets/notick.png'
import trash from '../assets/trash.png'

const Todoitems = ({text, id, isComplete, remove, toggle}) => {
    return (
        <div className="flex items-center mb-3 gap-2 min-h-10"> 
            <div onClick={()=>{toggle(id)}} className="flex flex-1 items-center cursor-pointer">
                <img className="w-5" src={isComplete?tick:notick} alt="tick icon" />
                <p className={`flex-1 text-black dark:text-white ml-4 text-[17px] ${isComplete?"line-through":""}`}>{text}</p>
            </div>

            <img onClick={()=>{remove(id)}} className="w-5 cursor-pointer" src={trash} alt="trash icon" />
        </div>  
    )
}

export default  Todoitems