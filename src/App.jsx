import { useEffect} from 'react'
import { useSelector } from 'react-redux'
import{Header, Footer} from './components/index'
import {login,logout} from './store/authSlice'
import authservice from './appwrite/auth'
import { useDispatch } from 'react-redux'
import { Outlet } from 'react-router-dom'


function App() {

  const loading = useSelector((state) => state.auth.loading)
  const dispatch = useDispatch()

useEffect(()=>{
  authservice.getCurrentUser()
  .then((userData)=>{
    if (userData) {
      dispatch(login({userData}))
    } else {
      dispatch(logout())
    }
  })
  .catch((err)=>{
    console.log("getCurrentUser Error", err)
    dispatch(logout())
  })
  // .finally(()=> setloading(false))

},[dispatch])

  return !loading ?(
  <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
    <div className='w-full block'>
      <Header/>
      <main>
        <Outlet/>
      </main>
      <Footer/>
    </div>
  </div> ) :null
}

export default App