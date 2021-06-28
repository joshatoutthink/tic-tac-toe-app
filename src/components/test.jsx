import React, {useEffect} from 'react'

export default function Test() {
  useEffect(()=>{
    window.alert('mounted')
  },[])
  return (
    <div>
      From React
    </div>
  )
}
