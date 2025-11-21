import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { removeJobListAPI, viewJobListAPI } from '../services/allAPI';
import { Tooltip } from '@mui/material';
import CustomSnackbar from '../components/CustomSnackbar';

function JobList() {
  const [snack,setSnack] = useState({
      open:false,
      message:"",
      severity:"success"
    })

  const [activeStatus, setActiveStatus] = useState('All');
  const statuses = ['All', 'Applied', 'Interview Scheduled', 'Interview Done', 'Selected', 'Rejected'];

  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('Newest'); 


  const [allJobs, setAllJobs] = useState([])
  // console.log(allJobs);

  // useEffect: fetch all job data from JSON server when the component loads
  useEffect(() => {
    getJobList()
  }, [])

  // getJobList: makes API call using viewJobListAPI and stores data in allJobs state
  const getJobList = async () => {

    try {
      const result = await viewJobListAPI()
      // console.log(result);
      if (result.status == 200) {
        setAllJobs(result.data)
      }
    } catch (error) {
      console.log(error);
    }


  }

  // filter by status when clicked on the buttons, If "All" is selected, show all jobs; otherwise, filter by selected status
  const filteredJobs = allJobs.filter(job => {
    const matchesStatus =
      activeStatus === "All" ||
      job.status.toLowerCase() === activeStatus.toLowerCase();

    const matchesSearch =
      job.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.role.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesStatus && matchesSearch;
  });


  const sortedJobs = [...filteredJobs].sort((a, b) => {
    const dateA = new Date(a.appliedDate);
    const dateB = new Date(b.appliedDate);
    return sortOrder == 'Newest' ? dateB - dateA : dateA - dateB;
  });


  const handleDeleteJob = async (id) => {
    try {
      await removeJobListAPI(id)
      getJobList()
      setSnack({
        open:true,
        message:"Job Deleted",
        severity:"error"
      }) 
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='container '>
      <h1 className="fw-bold my-3 text-dark  text-center">All Job Applications</h1>
      <p className="mb-4 fs-4  text-center">Manage and track all your applications</p>
        <div className="mb-4 text-center">
          {statuses.map(status => (
            <button
              key={status}
              className={`btn me-3 ${activeStatus === status ? 'btn-dark' : 'btn-outline-dark'}`}
              onClick={() => setActiveStatus(status)}
            >
              {status}
            </button>
          ))}
        </div>
        <div className="d-flex justify-content-center mb-5">
          <input type="text" className="form-control w-50 shadow-sm" placeholder="Search by company or role..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
          <select className="form-select w-auto ms-3" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value="Newest">Newest First</option>
            <option value="Oldest">Oldest First</option>
          </select>
        </div>

      <div className='d-flex flex-wrap'>
        {
          sortedJobs?.length > 0 ?
            sortedJobs?.map(job => (
              <div key={job?.id} style={{width:"300px"}} className=" card  border-0 rounded-4 shadow-lg p-3 mb-3 me-3 text-center ">
                <div className='card-body d-flex justify-content-center align-items-center  '>
                  <Tooltip title="View" arrow><Link to={`/view-job/${job.id}`}><i className="fa-regular fa-eye text-dark "></i></Link></Tooltip>
                  <Tooltip title="Delete" arrow><button onClick={() => handleDeleteJob(job?.id)} className='btn'><i className="fa-solid fa-trash  text-danger  "></i></button></Tooltip>
                </div>
                <h4 className='card-title fw-bold '>{job?.companyName}</h4>
                <p className='card-text fs-5'>{job?.role}</p>
                <p className='card-text fs-5'>{job?.location}</p>
                <p className='card-text fs-5'>Applied date: {job?.appliedDate}</p>
                <div className='text-center'>
                  <button className={`btn ${job.status === "Selected"
                      ? "btn-success text-white"
                      : job.status === "Rejected"
                        ? "btn-danger text-white"
                        : "btn-primary text-white"
                    }`}>{job.status}</button>
                </div>
              </div>
            ))
            : 
            <div className='my-4'>
              <img width={'200px'} src="https://i.pinimg.com/736x/e5/55/87/e55587d66eb7b637fc19ff959a6b04ab.jpg" alt="nothing here" />
              <h1 className='py-3 '>No Jobs Found!!!!</h1>
            </div>
        }
      </div>
      <CustomSnackbar open={snack.open} message={snack.message} severity={snack.severity} onClose={() => {
        setSnack({ ...snack, open: false })
        }}/>
    </div>


  )
}

export default JobList