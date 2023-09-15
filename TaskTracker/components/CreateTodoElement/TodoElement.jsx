import React  from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTrash,faPenToSquare} from '@fortawesome/free-solid-svg-icons'

const TodoElement=(pros)=>
{

    let deleteTodoHandler=(event)=>      //sending the element to function in app componenet to delete it
    {
       pros.deleteHandler(pros.element);
      
    }

 
    let editTodo=(event)=>   //send the element to the function in app component to edit
    {
       
        pros.firsrEditTodoReceiver(pros.element);
    }


    let checkBox=(event)=>
    {
      pros.checkBoxHandler(pros.element ,event.target.checked);   //calling the check box function from the app component
      
    }

   
    return <div className="d-flex justify-content-around ">
            
            
            <input  type="checkbox"   checked={pros.element.doneStatus} onChange={checkBox} id=""className= {`checkbox text-success fw-bold mb-3 icon `} />
            <FontAwesomeIcon icon={faTrash} className="text-danger fw-bold iconPlus icon" onClick={deleteTodoHandler} />
            <FontAwesomeIcon icon={faPenToSquare} className=" text-primary fw-bold icon"  onClick={editTodo} />
            
            </div>

      
   
}
export default TodoElement;