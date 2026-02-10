import { createContext, useReducer } from "react";

const ACTION = {
  SET_EXPENSE_ITEM: "SET_EXPENSE_ITEM",
  SET_VIEW_ITEM: "SET_VIEW_ITEM"
};

const initState = {
expense: [],
view:{}
  };
const expenseReducer = (state, action) => {
  console.log(state, action);

  const { type, payload } = action;
  switch (type) {
    case ACTION.SET_EXPENSE_ITEM:
      return { ...state, ...payload };
      case ACTION.SET_VIEW_ITEM:
        return { ...state, ...payload };
    default:
      throw new Error(`unhandle type in cart reducer ${type}`);
  }
};

export const ExpenseContext = createContext({
 
  expense: [],
  view:{},
addExpense: () => {},
  removeExpense: () => {},
});
const addExpense = (expense, expenseToAdd) => {
  return [...expense, { ...expenseToAdd}];
};

const removeExpense = (expense, removeExpense) => {
    console.log(removeExpense);
    console.log(expense);
    
  return expense.filter((item) => item.id !== removeExpense.id);

};


export const ExpenseProvider = ({ children }) => {
  const [{expense,view} , dispatch] =
    useReducer(expenseReducer, initState);
  const updateExpenseReducer = (expense) => {

 
    const payload = {
      expense
      
     };
    dispatch({ type: "SET_EXPENSE_ITEM", payload });
  };
  const addExpensefromList = (expenseToAdd) => {
    const newExpense = addExpense(expense, expenseToAdd);
    updateExpenseReducer(newExpense);
  };
  const removeExpensefromList = (expenseToRemove) => {
    const newExpense = removeExpense(expense, expenseToRemove);
  if(newExpense.every((item)=>item.id!==expenseToRemove.id)){
    const payload={view:{}}
         dispatch({ type: "SET_VIEW_ITEM", payload});
    }
    updateExpenseReducer(newExpense);

  };
  const viewExpensefromList=(expenseToView)=>{
  const payload = {
       view: expenseToView
     };
    dispatch({ type: "SET_VIEW_ITEM", payload });
  }
 
  const value = {
   removeExpensefromList,
   addExpensefromList,
   viewExpensefromList,
   expense,
   view
    
  };
  return <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>;
};
