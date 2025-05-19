import React from 'react'
import { Link } from 'react-router-dom'
import {Container,Logo,LogoutBtn} from './index'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  const navItems = [
    { name: 'Home', slug: '/' ,active: true },
    { name: 'About', slug: '/about' ,active: false },
    { name: 'Contact', slug: '/contact' ,active: false }, 
    { name: 'Features', slug: '/features' ,active: false },
    { name: 'Pricing', slug: '/pricing' ,active: false },
  ]
  return (
    <header className='py-3 shadow bg-gray-500'>
      <Container>
        <nav className='flex'>
          <div className='mr-4'> 
            <link to='/'>
              <Logo />
            </link>
          </div>
          <ul className='flex ml-auto'>
            {navItems.map((item) => (
              item.active ? (
                <li key={item.name}>
                  <button onClick={() => navigate(item.slug)} className='inline-block px-6 py-2
                  duration-200 hover:bg-blue-100 rounded-full'>
                    {item.name}
                  </button>
                </li>
              ): null
            ))}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header