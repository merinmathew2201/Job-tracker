import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div style={{ height: '300px', backgroundColor: '#0B2447' }} className=' text-light text-center fs-5 py-3 '>
      <p >Track your job applications, interview stages & improvement notes at one place.</p>

      <div className='container'>
        <hr />
        <div className='row'>
          <div className='col-4 text-start '>
            <h4>About Us</h4>
            <p>Track all your job applications, update status, add interview prep notes, and monitor your progress in one place.</p>
          </div>
          <div className="col-4 d-flex flex-column">
            <h4>Links</h4>
            <Link to={'/'} className='text-decoration-none text-light'>Home</Link>
            <Link to={'/jobs'} className='text-decoration-none text-light'>Jobs</Link>
          </div>
          <div className='col-4 text-center'>
            <h4>Contact Us</h4>
            <i className="fa-brands fa-instagram me-2" style={{ cursor: 'pointer' }} ></i>
            <i className="fa-brands fa-linkedin me-2" style={{ cursor: 'pointer' }} ></i>
            <i className="fa-brands fa-x-twitter" style={{ cursor: 'pointer' }}></i>
          </div>
        </div>
        <hr />
      </div>

      <p >2025 JobMate — Job Application Management & Tracking. All rights reserved.</p>

    </div>
  )
}

export default Footer