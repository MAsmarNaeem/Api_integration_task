import React from 'react'
import Dashboard from '../components/dashboard'
const dashboard = () => {
  var h = (window.innerHeight)/1.8;
//  console.log(" h is :",h);
  return (
    <div style={{height:h}}>
         <Dashboard/>
    </div>
  )
}

export default dashboard