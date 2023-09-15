import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faPenToSquare } from '@fortawesome/free-solid-svg-icons'


const Header = (pros) => {


    let [userInput, setUserInput] = useState('');


     // for newely created todo
     let userInputCollector = (event) => 
     {
         setUserInput(event.target.value);
     }
 
     
     const userInputSubmitter = (event) =>
     {
 
     event.preventDefault();
     pros.userInputHander(userInput);
     setUserInput('');
 
     }
   
    
    // for editing purpose

    let editInputHandler = (event) => {
        
        event.preventDefault();

        if(event.target.value === "" )
        {
            pros.forEmptyEditedElement(pros.elementToEdit.taskId);
        }
        else
        {
            pros.changeEditInputHandler(event.target.value);
          
        }

    }

    const editInputSubmitter = (event) => {
        event.preventDefault();
       
        pros.editInputSubmitter(pros.elementToEdit.taskId);
        
    
    }


   
    return (

        <div className="w-100 d-flex text-center justify-content-center ">

            <div>

                {

                    pros.elementToEdit.text === "" ?

                        // for submitting new todo
                        <form className="input-group inputBox" onSubmit={userInputSubmitter}>
                            <input type="text" onChange={userInputCollector} value={userInput} placeholder="Enter the task" className="form-control" aria-describedby="button-addon2" />
                            <button type="submit" className="btn btn-outline-none btn-danger p-0" ><FontAwesomeIcon icon={faPlus} className="  fw-bold icon h1 mt-1 text-light fw-bold iconPlus" /></button>
                        </form>
                        :
                        // for submit edited todo
                        <form className="input-group inputBox" onSubmit={editInputSubmitter}>
                            <input type="text" onChange={editInputHandler} value={pros.elementToEdit.text} className="form-control" aria-describedby="button-addon2" />
                            <button type="submit" className="btn btn-outline-none btn-primary p-1" ><FontAwesomeIcon icon={faPenToSquare} className=" text-primary h1 text-light p-2 fw-bold icon mt-1" /></button>
                        </form>

                }


            </div>

        </div>
    )
}
export default Header;