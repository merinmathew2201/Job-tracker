import React from 'react'
import { Link } from 'react-router-dom'


function GetStarted() {
  return (
    <div className="container text-center" style={{ minHeight: '60vh' }}>
      <h1 className='mt-5 fw-bold text-black'>Start Tracking Your Applications</h1>
      <p className='fs-4'>Choose your next step to begin managing your job search process efficiently.</p>

      <div className="row mt-5 justify-content-center">

        <div className="col-md-4 m-3">
          <div className="p-4 shadow-lg border rounded bg-primary-subtle hover-card">
            <h3 className='mb-3'>Add New Job <i className="fa-solid fa-address-card"></i></h3>
            <p className='fs-5'>Add company details, role, interview status and more.</p>
            <Link to={'/add-job'}><button style={{ backgroundColor: '#0B2447' }} className='btn text-light '>Add Job</button></Link>
          </div>
        </div>

        <div className="col-md-4 m-3">
          <div className="p-4 shadow-lg border rounded bg-light hover-card">
            <h3 className='mb-3'>View All Jobs <i className="fa-solid fa-list"></i></h3>
            <p className='fs-5'>See all saved job applications and update status anytime.</p>
            <Link to={'/jobs'}><button className='btn btn-dark '>View Jobs</button></Link>
          </div>
        </div>

      </div>

    </div>
  )
}

export default GetStarted