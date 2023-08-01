

import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const ProtectedRoute = (props) => {
    const {Component}=props
    const navigate=useNavigate()

    useEffect(()=>
    {
        let login=localStorage.getItem('token')

        if(!login)
        {
       navigate('/Login')
        }
    })
  return (
    <div>
 <Component/>
    </div>
  )
}

export default ProtectedRoute