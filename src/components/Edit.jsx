import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField, Tooltip } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { editJobAPI } from '../services/allAPI';
import CustomSnackbar from './CustomSnackbar';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  maxHeight:'80vh',
  overflowY:'auto',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


function Edit({jobDetails,setJobDetails}) {
  const progress = jobDetails.interviewProgress || {
  onlineAssessment: false,
  machineTest: false,
  technicalRound: false,
  managerialRound: false,
  hrRound: false,
  };

  const [snack,setSnack] = React.useState({
    open:false,
    message:"",
    severity:"success"
  })
  
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleUpdateJob = async ()=>{
    const {id,companyName,role,location,jobType,appliedVia,appliedDate,techStack } = jobDetails
    if(!companyName || !role || !location|| !jobType || !appliedVia || !appliedDate ||!techStack){
      setSnack({
        open:true,
        message:"Please fill the form completely",
        severity:"error"
      }) 
    }else{
      console.log("api call");
      const result = await editJobAPI(id,jobDetails)
      // console.log(result);
      if(result.status==200){
        setSnack({
            open:true,
            message:"Job Details Updated Successfully",
            severity:"success"
          })
        handleClose()
      }
      
    }
  }
  
  return ( 
    <div>
      <Tooltip title="Edit" arrow><Button onClick={handleOpen}><i className="fa-solid fa-file-pen me-3 fs-4 text-primary-emphasis"></i></Button></Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="" component="h4">
            Edit Job details
          </Typography>
          <Box id="modal-modal-description" sx={{ mt: 2 }}>
            {/* Basic job details */}
            <div>
              <h3>Basic Job Details</h3>
              <div className='p-3 row'>
                <TextField value={jobDetails.companyName} onChange={e=>setJobDetails({...jobDetails,companyName:e.target.value})} id="standard-basic-cname" className='mb-3' label="Company Name" variant="standard" />
                <TextField value={jobDetails.role} onChange={e=>setJobDetails({...jobDetails,role:e.target.value})} id="standard-basic-role" className='mb-3' label="Role / Position" variant="standard" />
                <TextField value={jobDetails.location} onChange={e=>setJobDetails({...jobDetails,location:e.target.value})} id="standard-basic-location" className='mb-3' label="Location" variant="standard" />
                <TextField value={jobDetails.jobType} onChange={e=>setJobDetails({...jobDetails,jobType:e.target.value})} id="standard-basic-jtype" className='mb-3' label="Job Type" variant="standard" />
              </div>
            </div>
            {/* Application Info */}
            <div>
              <h3>Application Info</h3>
              <div className='p-3 row'>
                <TextField value={jobDetails.appliedVia} onChange={e=>setJobDetails({...jobDetails,appliedVia:e.target.value})} id="standard-basic-asource" className='mb-3' label="Applied Source" variant="standard" />
                <TextField value={jobDetails.appliedDate} onChange={e=>setJobDetails({...jobDetails,appliedDate:e.target.value})} type='date' slotProps={{inputLabel: {shrink: true}}} id="standard-basic-adate" className='mb-3' label="Applied Date" variant="standard" />
                <TextField value={jobDetails.salary} onChange={e=>setJobDetails({...jobDetails,salary:e.target.value})} id="standard-basic-salary" className='mb-3' label="Salary" variant="standard" />
                <TextField value={jobDetails.workmode} onChange={e=>setJobDetails({...jobDetails,workmode:e.target.value})} id="standard-basic-workmode" className='mb-3' label="Workmode" variant="standard" />
                <TextField value={jobDetails.techStack} onChange={e=>setJobDetails({...jobDetails,techStack:e.target.value})} id="standard-basic-techstack" className='mb-3' label="Tech Stack Required" variant="standard" />
    
              </div>
            </div>
            {/* Application Status & Notes */}
            <div className='p-3 row'>
              <h3>Application Status & Notes</h3>
              
              <FormControl variant="standard" fullWidth>
                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={jobDetails.status}
                  label="Status"
                  onChange={e=>setJobDetails({...jobDetails,status:e.target.value})}
                >
                  <MenuItem value="Applied">Applied</MenuItem>
                  <MenuItem value="Interview scheduled">Interview scheduled</MenuItem>
                  <MenuItem value="Interview done">Interview done</MenuItem>
                  <MenuItem value="Selected">Selected</MenuItem>
                  <MenuItem value="Rejected">Rejected</MenuItem>
                  
                </Select>
              </FormControl>

              <FormGroup sx={{ mt: 3 }}>
                <h5 className='mb-1 '>Interview Progress</h5>
                <FormControlLabel control={<Checkbox checked={progress.onlineAssessment} onChange={(e) =>setJobDetails({...jobDetails,interviewProgress: {...progress,onlineAssessment: e.target.checked}})}/>} label="Online Assessment" />
    
                <FormControlLabel control={<Checkbox checked={progress.machineTest} onChange={(e) =>setJobDetails({...jobDetails,interviewProgress: {...progress,machineTest: e.target.checked}})}/>} label="Machine Test" />
    
                <FormControlLabel control={<Checkbox checked={progress.technicalRound} onChange={(e) =>setJobDetails({...jobDetails,interviewProgress: {...progress,technicalRound: e.target.checked}})}/>} label="Technical Round" />
    
                <FormControlLabel control={<Checkbox checked={progress.managerialRound} onChange={(e) =>setJobDetails({...jobDetails,interviewProgress: {...progress,managerialRound: e.target.checked}})}/>} label="Managerial Round" />
                  
                <FormControlLabel control={<Checkbox checked={progress.hrRound} onChange={(e) =>setJobDetails({...jobDetails,interviewProgress: {...progress,hrRound: e.target.checked}})}/>} label="HR Round" />
                
              </FormGroup>
              
              <TextField value={jobDetails.notes} onChange={e=>setJobDetails({...jobDetails,notes:e.target.value})}  id="standard-basic-notes" className='mt-3' label="Points to note" multiline rows={3} variant="standard" />


            </div>
            {/* update button */}
            <button onClick={handleUpdateJob} style={{backgroundColor:'#0B2447'}} className='btn text-light'>Update Data</button>
          </Box>
        </Box>
      </Modal>
      <CustomSnackbar open={snack.open} message={snack.message} severity={snack.severity} onClose={() => setSnack({ ...snack, open: false })}/>
    </div>
  )
}

export default Edit