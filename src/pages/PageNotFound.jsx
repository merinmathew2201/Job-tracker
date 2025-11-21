import React from 'react'
import { Link } from 'react-router-dom'

function PageNotFound() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center my-5" style={{height: '80vh'}}>
      <img width={'400px'} height={'400px'} src="https://assets-v2.lottiefiles.com/a/f0470cd6-117f-11ee-a4ed-1b2d7fb6aaaf/i83iUdPISg.gif" alt="" />
      <h3 className="mb-3">Oops! Page Not Found</h3>
      <p className="mb-4 fs-5">The page you are looking for does not exist.</p>
      <Link to="/">
        <button style={{backgroundColor:'#0B2447'}} className="btn text-light">Go to Home</button>
      </Link>
    </div>
  )
}

export default PageNotFound