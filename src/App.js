import {useEffect, useState} from "react"
import './App.css';

function App() {
  const [name,setname]=useState("");
  const [dateTime,setDateTime]=useState("");
  const [description,setDescription]=useState("");
  const [transactions, setTransactions] = useState([]);
  useEffect(()=>{
    getTransactions().then(setTransactions)
  },[]);

  async function getTransactions(){
    const url=process.env.REACT_APP_API_URL + "/transaction";
    const response = await fetch(url);

    return await response.json();
  }

  function addNewTransaction(event){
    event.preventDefault();
    const url=process.env.REACT_APP_API_URL + '/transaction';
    const price=name.split(' ')[0]
    console.log(url);
    fetch(url,
      {method:"POST",
      headers:{"content-type": "application/json"},
      body: JSON.stringify({
        price,
        name: name.substring(price.length+1),
        description,
        dateTime})
    }).then((response)=>{
      response.json().then((json)=>{
        setname("")
        setDateTime("")
        setDescription("")
        console.log("result",json);
      });
    });
  }
  let balance=0;
  for(const transaction of transactions){
    balance=balance+transaction.price;
  }
  return (
    <main>
      <h1>{balance}</h1>
      <form onSubmit={addNewTransaction}>
      <div className="basic">
        <input type="text" value={name} onChange={event=>setname(event.target.value)} placeholder={"20000 mobile"} />
        <input type="datetime-local" value={dateTime} onChange={event=>setDateTime(event.target.value)} />
        </div>
        <div className="description" >
        <input type="text" value={description} onChange={event=>setDescription(event.target.value)} placeholder={"description"} />
        </div>
        <button>Add New Transaction</button>
      </form>
      <div className="transactions">
      {
          transactions.length>0 && transactions.map(transaction=>(
            <div>
            <div className="transaction">
          <div className="left">
            <div className = "name">{transaction.name}</div>
            <div className="description">{transaction.description}</div>
          </div>
          <div className="right">
          <div className = {"price " + (transaction.price<0? 'red' : 'green')}>{transaction.price}</div>
          <div className="datetime">{transaction.dateT}</div>
          </div>
        </div>
            </div>
          ))
        }
        
        
      </div>
    </main>
    )
}

export default App;
