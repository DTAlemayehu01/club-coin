import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>User</h1>
      <br></br>
      <div className="card">
        <form action="" method="">
          <div class="grid grid-cols-4 md:grid-cols-4 gap-3">
            <div class="flex items-center">
              <label class="mr-2" for="withdraw_amt">Amount to Transfer:</label>
            </div>
            <div class="flex items-center col-span-3">
              <input class="border-1 border-white m-4 rounded-lg p-1" type="number" min="0" name="withdraw_amt" id="withdraw_amt"></input>
            </div>

            <div class="flex items-center">
              <label class="mr-2" for="wallet_address">Wallet Address:</label>
            </div>
            <div class="flex items-center col-span-3">
              <input class="border-1 border-white m-4 rounded-lg p-1" type="text" min="0" name="wallet_address" id="withdraw_amt"></input>
            </div>
          </div>
          <button>
            Send Amount
          </button>
        </form>
      </div>
    </>
  )
}

export default App
