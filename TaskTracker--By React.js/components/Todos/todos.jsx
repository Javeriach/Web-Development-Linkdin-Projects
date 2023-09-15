import React ,{useState} from "react";
import TodoElement from "../todolist/TodoElement";
const Todos = (pros)=>
{
   
    let todos=pros.todos;
  
    console.log(todos);
        return <div className="container mt-2 w-100">
          

            {
              todos.length === 0 ?
              "" :
            <h2 className="fw-bold">
                Your Tasks
            </h2>
            }

            <ul className="list-group list-group-flush w-100 ">
              {
                    
                todos.map((element,index)=> {
                
                  return  <li className="w-100 list-group-item d-flex justify-content-between" key={index}>
                    <p className="todolistItem w-75 ">
                    {element.text} 
                    </p>
                   <div className="w-25">

                   <TodoElement 
                   key={index} id={index} deleteHandler={pros.deleteTodo}  checkBoxObj={pros.checkBoxObj}
                   checkBoxContainer={pros.checkBoxContainer} firsrEditTodoReceiver={pros.firsrEditTodoReceiver}  todos={todos} element={element}
                   checkBoxHandler={pros.checkBoxHandler}/>
                   </div>
                   </li>
                })

                }

            </ul>
        </div>
}


export default Todos;