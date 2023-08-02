import Sidebar from './component/Sidebar'
import Main from './component/Main'
import './App.css'
import { useState } from 'react'



function App() {
  const [search, setIsSearch] = useState(null);

  return (
    <div className='App'>
      
        <Sidebar 
          isSearch={search}
          setIsSearch={setIsSearch}/>
        <Main 
        isSearch={search} />
      
    </div>
  )
}

export default App
