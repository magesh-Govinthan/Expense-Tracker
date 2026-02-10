import React, { useState } from "react";
import "./Home.css";
import { v4 as uuidv4 } from 'uuid';
import { useContext } from "react";
import { ExpenseContext } from "./Context/ExpenseContext";
import BarChart from "./GrapComponent";


function Home() {
  const [descriptionInput,setDescriptionInput]=useState("")
  const [amountInput,setAmountInput]=useState("")
  const [selectInput,setSelectInput]=useState("food")
  const [dateInput,setDateInput]=useState("")
  const [notesInput,setNotesInput]=useState("")
  
  const{  removeExpensefromList,
   addExpensefromList,
   viewExpensefromList,
   view,
   expense}=useContext(ExpenseContext)
  
  const handleDes=(e)=>{
    setDescriptionInput(e.target.value)
  }
  const handleAmt=(e)=>{
    setAmountInput(Number(e.target.value))
  }
    const handleSelect=(e)=>{
     setSelectInput(e.target.value)
  }
    const handleDate=(e)=>{
    setDateInput(e.target.value)
  }
  const handleNotes=(e)=>{
    setNotesInput(e.target.value)
  }
  const handleSubmit=()=>{
    // setAdd([...add,{id: uuidv4(),descriptionInput,amountInput,selectInput,dateInput,notesInput}])
    addExpensefromList({id: uuidv4(),descriptionInput,amountInput,selectInput,dateInput,notesInput})
    setDescriptionInput("");
    setAmountInput("");
    setSelectInput("food");
    setDateInput("");
    setNotesInput("");
  }
  // console.log(add)
  const handleView=(item)=>{
    // setView(item)
    viewExpensefromList(item)
  }
  const handleDelete=(data)=>{
  //  const remove=add.filter((item)=>item.id!==data.id)
  removeExpensefromList(data)

  //  setAdd(remove);

}
  console.log(view)
  console.log(expense)
  return (
    <div>
      
      <div className="exp-tracker">
        <h1>Expense Track</h1>
        <div className="exp-child1">
          <label>Description</label>
          <input type="text" placeholder="Description" value={descriptionInput} onChange={(e)=>handleDes(e)}/>
        </div>
        <div className="exp-child1">
          <label>Amount</label>
          <input type="number" placeholder="Amount" value={amountInput} onChange={(e)=>handleAmt(e)} />
        </div>
        <div className="exp-child1">
          <label>Category</label>
          <select value={selectInput} onChange={(e)=>handleSelect(e)} >
             
            <option value="food">Food</option>
            <option value="travel">Travel</option>
            <option value="bills">Bills</option>
            <option value="others">Others</option>
          </select>
        </div>
        <div className="exp-child1">
          <label>Date</label>
          <input type="date" value={dateInput} onChange={(e)=>handleDate(e)} />
        </div>
        <div className="exp-child1">
          <label htmlFor="Note">Notes</label>
          <textarea name="Note" placeholder="Write a notes" value={notesInput} onChange={(e)=>handleNotes(e)} />
        </div >
        
        <button type="submit" onClick={()=>handleSubmit()}>Submit</button> 
      </div>
      {expense.length>0 &&
      <>
      <div className="exp-expenseparent">
        <h1>Expense</h1>
        {expense.length> 0 && expense.map((item)=>
        <div className="exp">
        <div className="exp-expense">
          <div className="exp-child2">
          <h4 key={item.id}>
              {item.descriptionInput}
            </h4>
          </div>
          <div className="exp-child3">
            <h4>{item.amountInput}</h4>
          </div>
          <div className="exp-child3">
            <h4>{item.selectInput}</h4>
          </div>
          <div>
            <button onClick={()=>handleView(item)}>View</button>
          </div>
          <div>
            <button onClick={()=>handleDelete(item)}>Delete</button>
          </div>
          </div>
        </div>
        )}
      </div>
   </>}
    { Object.keys(view).length !== 0 &&
    
      <div className="exp-view">
        <h1>View Expense</h1>
       
        <div className="exp-detailparent">
          <div className="exp-child4">
            <h3>Description</h3>
            <p>
            {view.descriptionInput}
            </p>
          </div>
          <div className="exp-detail">
            
            <div>
              <h3>Amount</h3>
              <p>{view.amountInput}</p>
            </div>
            <div>
              <h3>Category</h3>
              <p>{view.selectInput}</p>
            </div>
            <div>
              <h3>Date</h3>
              <p>{view.dateInput}</p>
            </div>
          </div>
          <div className="exp-child4">
            <h3>Notes</h3>
            <p>
              {view.notesInput}
            </p>
          </div>
        </div>
    </div>}
    {expense.length>0&&
      <div className="exp-tracker">
      <BarChart/>
      </div>
}

    </div>
  );
  
}

export default Home;
