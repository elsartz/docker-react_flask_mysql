import { useState } from 'react'
import Notes from './components/Notes'
import AddNote from './components/AddNote'
import './assets/style.css'
function App() {
  

  return (
    <div id='body' className="flex-column min-100-vh">
      <header className='hero'>
        <h1 className='app-title'>Welcome</h1>
        <p>Write a title and a note or paste it in the textarea</p>
      </header>
      <main className='flex-row justify-space-between'>
        <div className="col-12 col-md-6">          
            {/* <AddNote/> */}
            AddNote
        </div>
        <div className="col-12 col-md-6">
          {/* <Notes/> */}
          Notes
        </div>  
      </main>          
    </div>
  )
}

export default App
