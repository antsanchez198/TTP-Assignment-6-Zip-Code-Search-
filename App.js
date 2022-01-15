import { useState, useEffect} from 'react';
import './App.css';
//import SearchBox from './Components/SearchBox';

function App() {

  const [zipcodeList, setList] = useState([])
  const [zipCode, setZipCode] = useState()
  const [loading, setLoading] = useState(true)
  const [tempList, setTempList] = useState([])

  const loadApi = async () => {
    try{
    const response = await fetch(`http://ctp-zip-api.herokuapp.com/zip/${zipCode}`)
    const jsonData = await response.json()
    setList(jsonData)
    // console.log(zipcodeList)
    }
    catch (err){
      console.error(err)
      alert(zipCode + " isn't a valid Zip Code! Try Again")
      setLoading(true)
    }
  }

  async function setInput(val){
    setZipCode(val.target.value)
    setLoading(true)
  }

  async function matchZipCode(){
    loadApi()
    for(let i = 0; i < zipcodeList.length; i++){
      if (zipcodeList[i].Zipcode == zipCode){
        tempList[i] = zipcodeList[i]
      }
    }
    setList(tempList)
    setLoading(false)
  }

  return (
    <div className="App">
      <h1>Enter a Zip Code Below</h1>
      <input type="text" placeholder='Enter a Zip Code' onChange={setInput}></input>  
      <button onClick={matchZipCode}>Search</button>
      {loading === false ? zipcodeList.map(index => {
        return(
          <body>
            <span>Zip-Code: {index.Zipcode}</span>
            <span>Location: {index.LocationText}</span>
            <span>Country: {index.Country}</span>
            <span>Population: {index.EstimatedPopulation}</span>
          </body>
        )
      }) : <p></p>}
    </div>
  );
}

export default App;
