import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useContext } from 'react';
 
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
import { Bar } from 'react-chartjs-2';
import { ExpenseContext } from './Context/ExpenseContext';

 
 function BarChart(){
    const{expense}=useContext(ExpenseContext);
    const Food=expense.filter((item)=>item.selectInput==="food")
    .reduce((acc,ele)=>acc+ele.amountInput,0)
     const Bills=expense.filter((item)=>item.selectInput==="bills")
    .reduce((acc,ele)=>acc+ele.amountInput,0)
     const Travel=expense.filter((item)=>item.selectInput==="travel")
    .reduce((acc,ele)=>acc+ele.amountInput,0)
    const Others=expense.filter((item)=>item.selectInput==="others")
    .reduce((acc,ele)=>acc+ele.amountInput,0)
 
const data = {
    labels: ['Food', 'Bills','Travel', 'Others'],
    datasets: [
      {
        label: 'Expense',
        data: [Food,Bills,Travel,Others],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };
  console.log([Food,Bills,Travel,Others]);
  
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Expenses',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  return(
//   <div style={{ width: '800px', height: '1000px' }}>
<>
  {expense.length>0 && <Bar data={data} options={options} width={1000} height={500} />}
  </>
// </div>
  )
  }
  export default BarChart