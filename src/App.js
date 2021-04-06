import React, {useState, useEffect} from 'react'
import axios from 'axios'

const useHackerNewsApi = () => {
    const [ data, setData ] = useState({ hits: [] })
    const [ url, setUrl ] = useState(`https://hn.algolia.com/api/v1/search?query=redux`)
    const [ isLoading, setIsLoading ] = useState(false)
    const [ isError, setIsError ] = useState(false)

    useEffect( () => {
      const fetchData = async () => {
        setIsError(false)  
        setIsLoading(true)

        try {
          const result = await axios(url)
          setData(result.data)
        } catch (error) {
          setIsError(true)
        }
        setIsLoading(false)

      } 
    fetchData()
    }, [url]);
    return [ {data, isLoading, isError}, setUrl ]  
}

const App = () => {
  const [ query, setQuery ] = useState('redux')

  const [ {data, isLoading, isError }, doFetch ] = useHackerNewsApi()
  // const url= `https://hn.algolia.com/api/v1/search?query=query //or =search`
  
 

  return (
    <>
      <form onSubmit={event => {
        doFetch(`https://hn.algolia.com/api/v1/search?query=${query}`)
        event.preventDefault()
      }}>
      <input 
        type="text"
        value={query}
        onChange = {event => setQuery(event.target.value)}
        />
        <button type="submit">Search</button>

      // { isError && <div>Something went wrong ...</div> }

      {isLoading ? (
        <div>Loading ...</div>
        ) : (
      <ul>
        {data.hits.map(item => (
          <li key={item.objectID}>
              <a href={item.url}>{item.title}</a>
          </li>
          )
        )}
      </ul>
      )}
      </form>
    </>
  )
};
export default App;
