import { useEffect, useState} from 'react'
import{Header, Footer} from './components/index'
import {login,logout} from './store/authSlice'
import authservice from './appwrite/auth'
import { useDispatch } from 'react-redux'
import { Outlet } from 'react-router-dom'


function App() {

  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch()

useEffect(() => {
    authservice.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .catch(() => {
        dispatch(logout());
      })
    .finally(() => setLoading(false))
  }, [])

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
        Loading...
      </div>

  
}

export default App