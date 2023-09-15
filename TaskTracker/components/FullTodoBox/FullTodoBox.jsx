import React from "react";
import Header from "../Header/Header";
import Todos from "../Todos/todos";
import Footer from "../Footer/footer";
const FullTodoBox=(pros)=>
{
  console.log(pros.todos);
  // if(pros.todoslist.length === 0)
  // {
  //   alert('funn todo box');
  // } 
  
     // console.log(pros.todos);
     return <>
      
              <div>
              
              
                  <Header userInputHander={pros.userInputHander} todoslist={pros.todos}
                  elementToEdit={pros.elementToEdit} 
                  changeEditInputHandler={pros.changeEditInputHandler}
                    editInputSubmitter={pros.editInputSubmitter} forEmptyEditedElement={pros.forEmptyEditedElement} 
                  />
                  
                <Todos  todos={pros.todos} className="w-100" deleteTodo={pros.deleteTodo} checkBoxObj={pros.checkBoxObj}
                  checkBoxContainer={pros.checkBoxContainer} firsrEditTodoReceiver={pros.firsrEditTodoReceiver} checkBoxHandler={pros.checkBoxHandler}    
                  />
                
                  <Footer className="card-footer w-100 " todos={pros.todos}
                  clearAll={pros.clearAll}  />

              </div>
           
           </>
}
export  default FullTodoBox;