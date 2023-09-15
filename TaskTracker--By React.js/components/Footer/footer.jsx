import React from "react";

const Footer=(pros)=>{

    let todos = pros.todos;
   
    let deleteAllHandler=()=>{
      pros.clearAll();
    }

    let pendingtask=0;

    for(let i=0; i < todos.length ; i++)   //for calculting the pending task
    {
        if(todos[i].doneStatus === false)
        {
          pendingtask++;
        }
    }

  return <div className="container w-100">

        <div className="d-flex justify-content-between  align-items-center">
        <p  className="fw-bold taskNumber  w-75">
            You have {pendingtask} pending  tasks
        </p>
        {
              todos.length === 0 ?
              "" :
              <button className=" clearAllBtn btn btn-primary text-light  btn-sm fw-bold " onClick={deleteAllHandler}> Clear All</button>

        }
        </div>
        
  </div>
}

export default Footer;