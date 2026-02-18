import React, { useEffect, useState } from "react";
import "./Home.css";
import { v4 as uuidv4 } from "uuid";
import { useContext } from "react";
import { ExpenseContext } from "./Context/ExpenseContext";
import BarChart from "./GrapComponent";

function Home() {
  const [descriptionInput, setDescriptionInput] = useState("");
  const [amountInput, setAmountInput] = useState("");
  const [selectInput, setSelectInput] = useState("food");
  const [dateInput, setDateInput] = useState("");
  const [notesInput, setNotesInput] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [categoryValue, setCategoryValue] = useState("");
  const [totalCategory, setTotalCategory] = useState(0);
  const category = ["Food", "Bills", "Travel", "Others"];

  const {
    removeExpensefromList,
    addExpensefromList,
    viewExpensefromList,
    view,
    expense,
  } = useContext(ExpenseContext);

  const expenseDetailByLocal = JSON.parse(
    localStorage.getItem("expenseDetail"),
  );
  console.log(expenseDetailByLocal);

  const [filterData, setFliterData] = useState(
    expense.length === 0 ? expenseDetailByLocal : [],
  );

  useEffect(() => {
    setFliterData(expense);
  }, [expense]);

  const handleDes = (e) => {
    setDescriptionInput(e.target.value.trim());
  };
  const handleAmt = (e) => {
    setAmountInput(+e.target.value.trim());
  };
  const handleSelect = (e) => {
    setSelectInput(e.target.value.trim());
  };
  const handleDate = (e) => {
    setDateInput(e.target.value.trim());
  };
  const handleNotes = (e) => {
    setNotesInput(e.target.value.trim());
  };
  const expenseAllTotal = filterData.reduce(
    (acc, ele) => acc + Number(ele.amountInput),
    0,
  );
  console.log(expenseAllTotal);
  const handleSubmit = () => {
    if (descriptionInput === "") return;
    if (amountInput === "") return;
    if (selectInput === "") return;
    if (dateInput === "") return;
    if (notesInput === "") return;
    else {
      // setAdd([...add,{id: uuidv4(),descriptionInput,amountInput,selectInput,dateInput,notesInput}])
      addExpensefromList({
        id: uuidv4(),
        descriptionInput,
        amountInput,
        selectInput,
        dateInput,
        notesInput,
      });

      setDescriptionInput("");
      setAmountInput("");
      setSelectInput("food");
      setDateInput("");
      setNotesInput("");
    }
  };
  // console.log(add)
  const handleView = (item) => {
    // setView(item)
    viewExpensefromList(item);
  };
  const handleDelete = (data) => {
    //  const remove=add.filter((item)=>item.id!==data.id)
    removeExpensefromList(data);

    //  setAdd(remove);
  };
  const handleFilterDate = (e) => {
    setSelectedValue(e.target.value);
    setCategoryValue("");

    setTotalCategory(expenseAllTotal);

    if (e.target.value === "date") {
      const sortExpensebyDate = [...expense].sort(
        (a, b) => new Date(b.dateInput) - new Date(a.dateInput),
      );
      setFliterData(sortExpensebyDate);
    }
    if (e.target.value === "amount") {
      const sortExpenseByAmount = [...expense].sort(
        (a, b) => Number(a.amountInput) - Number(b.amountInput),
      );
      setFliterData(sortExpenseByAmount);
    }
  };

  const handleReset = () => {
    setSelectedValue("");
    setCategoryValue("");
    filterData([]);
 
  };

  const handleCategory = (e) => {
      setSelectedValue("");
    setCategoryValue(e.target.value);
  
  if (e.target.value.toLowerCase() === "food") {
    const filterFood = [...expense].filter(
        (item) => item.selectInput.toLowerCase() === "food",
      );
      const totalFood = filterFood.reduce(
        (acc, ele) => acc + Number(ele.amountInput),
        0,
      );
      setTotalCategory(totalFood);
      setFliterData(filterFood);
    }
    if (e.target.value.toLowerCase() === "travel") {
      const filterTravel = [...expense].filter(
        (item) => item.selectInput.toLowerCase() === "travel",
      );
      const totalTravel = filterTravel.reduce(
        (acc, ele) => acc + Number(ele.amountInput),
        0,
      );
      setTotalCategory(totalTravel);
      setFliterData(filterTravel);
    }
    if (e.target.value.toLowerCase() === "bills") {
      const filterBills = [...expense].filter(
        (item) => item.selectInput.toLowerCase() === "bills",
      );
      const totalBills = filterBills.reduce(
        (acc, ele) => acc + Number(ele.amountInput),
        0,
      );
      setTotalCategory(totalBills);
      setFliterData(filterBills);
    }
    if (e.target.value.toLowerCase() === "others") {
      const filterOthers = [...expense].filter(
        (item) => item.selectInput.toLowerCase() === "others",
      );
      const totalOthers = filterOthers.reduce(
        (acc, ele) => acc + Number(ele.amountInput),
        0,
      );
      setTotalCategory(totalOthers);
      setFliterData(filterOthers);
    }
  };
  console.log(view);
  console.log(expense);
  return (
    <div className="EXPENSE_PAR">
      <div className="exp-tracker">
        <h1>Expense Track</h1>
        <div className="exp-child1">
          <label>Description</label>
          <input
            className="input"
            type="text"
            placeholder="Description"
            value={descriptionInput}
            onChange={(e) => handleDes(e)}
          />
        </div>
        <div className="exp-child1">
          <label>Amount</label>
          <input
            className="input"
            type="number"
            placeholder="Amount"
            value={amountInput}
            onChange={(e) => handleAmt(e)}
          />
        </div>
        <div className="exp-child1">
          <label>Category</label>
          <select value={selectInput} onChange={(e) => handleSelect(e)}>
            <option value="food">Food</option>
            <option value="travel">Travel</option>
            <option value="bills">Bills</option>
            <option value="others">Others</option>
          </select>
        </div>
        <div className="exp-child1">
          <label>Date</label>
          <input
            className="input"
            type="date"
            value={dateInput}
            onChange={(e) => handleDate(e)}
          />
        </div>
        <div className="exp-child1">
          <label htmlFor="Note">Notes</label>
          <textarea
            name="Note"
            placeholder="Write a notes"
            value={notesInput}
            onChange={(e) => handleNotes(e)}
          />
        </div>

        <button
          type="submit"
          className="btn-one"
          onClick={() => handleSubmit()}
        >
          Submit
        </button>
      </div>

      <>
        <div className="exp-expenseparent">
          <div className="li-exp">
            <h1>List of Expense</h1>
            <div className="expense-con">
              <div>
                <h1>
                  Total:{selectedValue === "" ? expenseAllTotal : totalCategory}
                </h1>
              </div>
              <div className="input-expense">
                <label className="inputLabel">
                  <input
                    className="inputRadio"
                    type="radio"
                    name="Date"
                    value="date"
                    checked={selectedValue === "date"}
                    onChange={(e) => handleFilterDate(e)}
                  />
                  Date
                </label>

                <label className="inputLabel">
                  <input
                    className="inputRadio"
                    type="radio"
                    name="amount"
                    value="amount"
                    checked={selectedValue === "amount"}
                    onChange={(e) => handleFilterDate(e)}
                  />
                  Amount
                </label>

                <button className="btn-one" onClick={() => handleReset()}>
                  Reset
                </button>
              </div>
            </div>
            <div className="expense-con">
              <div>
                <h4 style={{ background: "transparent" }}>Category by</h4>
              </div>
              <div className="category-expense">
                {category.map((item) => (
                  <label className="inputLabel">
                    <input
                      className="inputRadio"
                      type="radio"
                      name={item}
                      value={item}
                      checked={categoryValue === item}
                      onChange={(e) => handleCategory(e)}
                    />
                    {item}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {filterData &&
            filterData.map((item) => (
              <div className="exp" key={item.id}>
                <div className="exp-expense">
                  <div className="exp-child2">
                    <p>{item.descriptionInput}</p>
                  </div>
                  <div className="exp-child3">
                    <h4>{item.amountInput}</h4>
                  </div>
                  <div className="exp-child3">
                    <p>{item.dateInput}</p>
                  </div>
                  <div className="exp-child3">
                    <h4>{item.selectInput}</h4>
                  </div>
                  <div>
                    <button className="btn1" onClick={() => handleView(item)}>
                      View
                    </button>
                  </div>
                  <div>
                    <button className="btn2" onClick={() => handleDelete(item)}>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </>
      {expense.length > 0 && (
        <div className="exp-tracker1">
          <h1>Chart</h1>
          <BarChart />
        </div>
      )}
      {Object.keys(view).length !== 0 && (
        <div className="exp-view">
          <h1>View Expense</h1>

          <div className="exp-detailparent">
            <div className="exp-child4">
              <h3>Description</h3>
              <p>{view.descriptionInput}</p>
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
              <p>{view.notesInput}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
