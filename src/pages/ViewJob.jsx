import Edit from '../components/Edit';
import { Link, useParams } from 'react-router-dom';
import { viewJobDetailsAPI } from '../services/allAPI';
import { useEffect, useState } from 'react';
import { Tooltip } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';




function ViewJob() {

  const { id } = useParams()
  const [jobDetails, setJobDetails] = useState({})
  // console.log(jobDetails);

  useEffect(() => {
    getJobDetails()
  }, [])

  const getJobDetails = async () => {
    const result = await viewJobDetailsAPI(id)
    // console.log(result);
    try {
      if (result.status == 200) {
        setJobDetails(result.data)
      }
    } catch (error) {
      console.log(error);
    }

  }

  const rounds = ["onlineAssessment", "machineTest", "technicalRound", "managerialRound", "hrRound"];

  

  const progress = jobDetails.interviewProgress || {
  onlineAssessment: false,
  machineTest: false,
  technicalRound: false,
  managerialRound: false,
  hrRound: false,
};

const total = rounds.length;
  const completed = rounds.filter(round => progress?.[round]).length;
  const percent = (completed / total) * 100;

  return (
    <div className='container'>
      <div className=" card shadow py-4 px-5 my-3">
        <h1 className='text-center'>JOB DETAILS</h1>
        <div className='d-flex justify-content-end align-items-center'>
          <Edit jobDetails={jobDetails} setJobDetails={setJobDetails} />
          <Tooltip title="Back" arrow><Link to={'/jobs'}><i className="fa-solid fa-backward fs-4 text-primary-emphasis"></i></Link></Tooltip>
        </div>
        <div className='d-flex justify-content-center align-items-center mt-3'>
          <p className='fs-5 me-4' ><i class="fa-solid fa-building me-2 text-primary-emphasis"></i><strong>Company Name:</strong> {jobDetails.companyName} </p>
          <p className='fs-5 me-4'> | <i class="fa-solid fa-briefcase me-2 text-danger-emphasis"></i><strong>Role:</strong> {jobDetails.role} </p>
          <p className='fs-5'> | <i class="fa-solid fa-location-dot me-2 text-danger"></i><strong>Location:</strong> {jobDetails.location}</p>
        </div>
        <hr />

        <p className='fs-5'><strong>Job Type:</strong> {jobDetails.jobType}</p>
        <p className='fs-5'><strong>Applied via:</strong> {jobDetails.appliedVia}</p>
        <p className='fs-5'><strong>Applied date:</strong> {jobDetails.appliedDate}</p>
        <p className='fs-5'><strong>Salary:</strong> {jobDetails.salary}</p>
        <p className='fs-5'><strong>Workmode:</strong> {jobDetails.workmode}</p>
        <p className='fs-5'><strong>Tech Stack:</strong> {jobDetails.techStack}</p>
        <p className='fs-5'><strong>Status:</strong> {jobDetails.status}</p>
        <p className='fs-5'><strong>Notes:</strong> {jobDetails.notes}</p>

         <Box sx={{ my: 3 }}>
        <h3 className="mb-4 fw-bold">Interview Progress</h3>
        
        <div className='mb-4'>
          {progress.onlineAssessment && <h5> <i className="fa-solid fa-check text-success"></i> Online Assessment</h5>}
          {progress.machineTest && <h5> <i className="fa-solid fa-check text-success"></i>Machine test</h5>}
          {progress.technicalRound && <h5> <i className="fa-solid fa-check text-success"></i>Technical Round</h5>}
          {progress.managerialRound && <h5><i className="fa-solid fa-check text-success"></i>Managerial Round</h5>}
          {progress.hrRound && <h5><i className="fa-solid fa-check text-success"></i>HR Round</h5>}
        </div>

        <LinearProgress color="secondary" variant="determinate" value={percent} sx={{ height: 10, borderRadius: 5 }}/>

        <Typography sx={{ mt: 1 }} fontWeight={600}>
          {completed} / {total} rounds completed ({Math.round(percent)}%)
        </Typography>


      </Box>
      </div>
    </div>

  )
}

export default ViewJob