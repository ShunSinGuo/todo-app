import { useState } from 'react'
import viteLogo from '/vite.svg'
import Todo from './components/Todo'

function App() {

  return (
    <div className="bg-stone-900 dark:bg-gray-700 grid py-4 min-h-screen">
      <Todo/>
    </div>
  )
}

export default App
