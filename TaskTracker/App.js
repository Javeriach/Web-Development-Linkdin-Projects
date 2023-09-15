import React  , {useEffect, useState}from 'react';
import FullTodoBox from './components/FullTodoBox/FullTodoBox';
import 'bootstrap/dist/css/bootstrap.css'
import './App.css';

const App=()=>
{

  // let [todolist, setTodo]=useState([]);  //to get the todo 

  let [arrayContainer,setArrayContainer] = useState(JSON.parse(localStorage.getItem('todolist')));  //to get the data 
  // of the todolist from the local storage

  let [taskId,setTaskId]=useState(arrayContainer.length);  //to give every element a id
  let [elementToEdit, setEditElement]=useState({
    taskId:'',
    text:''
  });


  // ---------------------------------------------------------------------------


                  // ----functions for creating the todolist
  let userInputHander=(userInput)=>
  {
    
    if(userInput === "")
    {
      msgHandler('Input Field empty','alert-danger');
    }
    else
    {
    
      //to store the data in local storage , we are adding array container too to maintain the previoius content 
      // when we add new data it overwrites the prevous data so that' why we add the previous data
      localStorage.setItem('todolist',JSON.stringify([{text:userInput , doneStatus:false , taskId:taskId},...arrayContainer]));
      
      //to combine the data from the local storage and new data
      setArrayContainer( (ps)=>[{text:userInput , doneStatus:false , taskId:taskId},...ps]);
    
      // setTodo([{text:userInput , doneStatus:false  , taskId:taskId },...arrayContainer]); 

      setTaskId((ps)=>ps +1);
      
      msgHandler(' Task add successfully','alert-success');
    }
  }
 


// ---------------------------------------------------------------------------
// for the checkbox condition


let checkBoxHandler=(toCheckElement,condition)=>
{
  if(condition === true)
  {
    let updatedArray=arrayContainer.map((element)=>
    {
          if(element.taskId === toCheckElement.taskId)  //if exist then make it true
          return {...element ,doneStatus:true}

          else
          {
            return element;
          }
    })

    if(arrayContainer.length > 0)
    {
   
      localStorage.setItem('todolist',JSON.stringify(updatedArray));
      setArrayContainer(updatedArray);
    }

  }

  if(condition === false)
  {
    let updatedArray= arrayContainer.map((element)=>
    {
        if(element.taskId === toCheckElement.taskId)  //if it true then make it false
        return {...element ,doneStatus:false}

        else
        {
          return element;
        }

    })
    if(arrayContainer.length > 0)
    {
      
      localStorage.setItem('todolist',JSON.stringify(updatedArray));
      setArrayContainer(updatedArray);
    }
    console.log(arrayContainer);

  }
}


//-------- functions for delete the todo task

let deleteTodo=(elementTodelete)=>
{
    
    let filteredArry = arrayContainer.filter((element)=>{
        return elementTodelete.taskId !== element.taskId;

    })

  
  // for the data store in the memory to display on the screen
  if(filteredArry.length === (arrayContainer.length -1))
{  
   
   setArrayContainer(filteredArry);
   localStorage.setItem('todolist',JSON.stringify(filteredArry));
}

    if(filteredArry.length < arrayContainer.length)
    msgHandler('Task Deleted Successfully','alert-success');
}
 
  
  // -------------------for the editing of the todo task
  // for moving the target todo to the imp

  const firsrEditTodoReceiver=(element)=>
  {
    setEditElement({
     ...element
    })
   
  }


  // to enable the editing of  selected element in the input field 

  const changeEditInputHandler=(value)=>
        {
         
            setEditElement((previousState)=>
            {
              return ({ 
               
                ...previousState,
                text:value,
              }
              
              )
            })       
          
        }
    
  // for the user entering the empty edited element
  let forEmptyEditedElement =(id)=>
  {
     
        setEditElement((ps)=>          //to keep the form display until the any input
        {
          return { 
            ...ps ,
                text:[],
              taskId:id
            }
        });
        
     
  }

 

  // for the edited element submittion
  const editInputSubmitter=(id)=>
  {
    if(elementToEdit.text.length === 0)
    {
     
      //to keep the edit form display until the any input
      alert(`Empty Input field can't be submitted!!`)
      
      setEditElement((ps)=>
      {
        return{
          ...ps,
          text:'  '
        }
      });


    }
    else{
     
  
      let updatedTodo= arrayContainer.map((element)=>
      {
 
        if(element.taskId === elementToEdit.taskId)   //updated the target task
        return {...element , text:elementToEdit.text} 
        
        else return element;
        
      })
     

    
    if(updatedTodo.length > 0)
    { 
     
      setArrayContainer(updatedTodo);
      localStorage.setItem('todolist',JSON.stringify(updatedTodo));
    }
 
      setEditElement({
       taskId:'',
       text:''
     });


     msgHandler('Target Task Updated successfully','alert-success');

    }
    

  }

// -----------------------------------------------------------------
// function for the functionality of the clear button

let clearAll=()=>
{
  

  if(arrayContainer.length >0)
   { 
      
      setTaskId(0);
      setArrayContainer([]);
      localStorage.setItem('todolist',JSON.stringify([]));   //also empty the local storage
     
      msgHandler('All tasks Deleted Successfully','alert-success');
  
   }

}
// -----------------------------------------------------------------------
  // For alert Bootstrap Handling

  let [msg,setMsg]=useState('null');
  let [color,setMsgColor]=useState('');
  let [display, setMsgDisplay]=useState('d-none');

  const msgHandler=(msg,color)=>
  {
    setMsg(msg);
    setMsgDisplay('block');
    setMsgColor(color); 
    setTimeout(()=>
    {
       setMsgDisplay('d-none');
       setMsg('');
       setMsgColor('');
  
    },1000)

  }

 

  
// --------------------------------------------------------------------------------------------- 
  

  return <div className='todo_part '>

      <label className='heading  text-center  w-100 text-light mb-5 '> 📝Task Tracker✍</label>  
      <div className="container w-100 text-bg-light pt-4">
         
       

          <div className={`fw-bold text-center alert lead ${color} lead ${display} `} role="alert">
                                {msg} 
          </div>


        
          <FullTodoBox  todos={arrayContainer} userInputHander={userInputHander} 
          checkBoxHandler={checkBoxHandler}  
          deleteTodo={deleteTodo} clearAll={clearAll} firsrEditTodoReceiver={firsrEditTodoReceiver}
          elementToEdit={elementToEdit}  changeEditInputHandler={changeEditInputHandler}
          editInputSubmitter={editInputSubmitter}  forEmptyEditedElement={forEmptyEditedElement}/>

      </div>
    
    </div>
}
export default App;