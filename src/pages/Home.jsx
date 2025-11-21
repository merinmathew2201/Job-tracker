import React from 'react'
import { Link } from 'react-router-dom'


function Home() {
  return (
    <>
      <div style={{minHeight:'60vh'}} className='container-fluid my-5' >
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-5 shadow rounded my-4 p-5 bg-primary-subtle ">
            <h1>JobMate – Your Personal Career Progress Tracker</h1>
            <p className='fs-5'>Never lose track of where you applied, what happened, and what to improve.</p>
            <Link to={'/get-started'}><button style={{backgroundColor:'#0B2447'}} className='btn text-light'>Start Tracking</button></Link>
          </div>
          <div className="col-md-1"></div>
          <div className="col-md-5">
            <img width={'400px'} height={'400px'} src="https://img.freepik.com/premium-vector/business-meeting-discussion-man-woman-office-table-vector-illustration_107641-425.jpg?semt=ais_hybrid&w=740&q=80" alt="" />
          </div>
        </div>
      </div>

      <div className="container py-5 my-5">
          <h2 className='text-center fw-bold mb-4'>Why JobMate?</h2>
          <div className="row">
            <div className="col-md-4 mb-3">
              <div className="card shadow rounded p-4 h-100 hover-card">
                <h5 className='fw-bold'>Track Every Application</h5>
                <p className='mt-2 fs-5'>Store job role, company name, platform, and date applied all in one place.</p>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="card shadow rounded p-4 h-100 hover-card">
                <h5 className='fw-bold'>Monitor Interview Progress</h5>
                <p className='mt-2 fs-5'>Record every stage outcome and know where you stand instantly.</p>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="card shadow rounded p-4 h-100 hover-card">
                <h5 className='fw-bold '>Improve Your Chances</h5>
                <p className='mt-2 fs-5'>Write improvement notes to upgrade your performance for the next interview.</p>
              </div>
            </div>
          </div>
        </div>

        <div style={{minHeight:'90vh', backgroundImage:'url("https://www.how2become.com/wp-content/uploads/2024/12/job_interview_skills.jpeg")',backgroundAttachment:'fixed',backgroundSize:'cover'}}></div>

        <div className="text-center py-5 bg-light mt-3">
        <h2 className='fw-bold'>Start managing your job hunt smarter today!</h2>
        <Link to={'/get-started'}>
          <button style={{backgroundColor:'#0B2447'}} className='btn text-light mt-3 px-5 py-2'>Get Started</button>
        </Link>
      </div>
  </>
  )
}

export default Home