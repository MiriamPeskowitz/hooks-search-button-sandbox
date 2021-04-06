import React, {useState, useEffect} from 'react'
import axios from 'axios'

// const url = `https://hn.algolia.com/api/v1/search?query=redux`


const App = () => {
  const [ data, setData ] = useState({ hits: [] })
  const [ query, setQuery ] = useState('redux')
  const [ url, setUrl ] = useState(`https://hn.algolia.com/api/v1/search?query=redux`)
  // const url= `https://hn.algolia.com/api/v1/search?query=query //or =search`
  
  useEffect( () => {
    const fetchData = async () => {
      const result = await axios(url)
      setData(result.data)
      console.log(url)
      console.log(result.data)
    } 
  fetchData()
  }, [url]) //change value in input field
  //

  return (
    <>
      <input 
        type="text"
        value={query}
        onChange = {event => setQuery(event.target.value)}
        />
        <button
          type="button"
          onClick={() => setUrl(`https://hn.algolia.com/api/v1/search?query=${query}`)}
        >
          Search
        </button>
      <ul>
        {data.hits.map(item => (
          <li key={item.objectID}>
              <a href={item.url}>{item.title}</a>
          </li>
          )
        )}
      </ul>
    </>
  )
}
export default App;

//cant use async directly in an effect 

 // useEffect(async () => {
 //    const result = await axios(url)
 //    setData(result.data)
 //    console.log(result.data)
 //  }, [])

// const App = () => {
//   const [name, setName] = useState('world')
  
//   useEffect(() => {
//     document.title= `Hello, ${name}`
//   });

//   return (
//     <div className="App">
//      <h1>Hello {name} </h1>
//      <button onClick={() => setName('Jim')}>
//      Click to change name </button>
//     </div>
//   );
// }