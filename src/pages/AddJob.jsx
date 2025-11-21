import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { addJobAPI } from '../services/allAPI';
import { useNavigate } from 'react-router-dom';
import CustomSnackbar from '../components/CustomSnackbar';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';


const steps = ['Basic Job Details', 'Application Info', 'Application Status & Notes'];

function AddJob() {
  const navigate = useNavigate();

  const [snack, setSnack] = React.useState({
    open: false,
    message: "",
    severity: "success"
  })

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const [jobDetails, setJobDetails] = React.useState({
    companyName: "",
    role: "",
    location: "",
    jobType: "",
    appliedVia: "",
    appliedDate: "",
    salary: "",
    workmode: "",
    techStack: "",
    interviewProgress: {
      onlineAssessment: false,
      machineTest: false,
      technicalRound: false,
      managerialRound: false,
      hrRound: false
    },
    status: "",
    notes: "",
  })

  // console.log(jobDetails);

  const handleAddJob = async () => {
    // destructuring first 4 data in the form
    const { companyName, role, location, jobType, appliedVia, appliedDate, techStack } = jobDetails
    if (!companyName || !role || !location || !jobType || !appliedVia || !appliedDate || !techStack) {
      setSnack({
        open: true,
        message: "Please fill the form completely",
        severity: "warning"
      })

    } else {
      console.log("api call");
      try {
        const result = await addJobAPI(jobDetails)
        // console.log(result);
        if (result.status == 201) {
          setSnack({
            open: true,
            message: "Job Details Added Successfully",
            severity: "success"
          })

        }

      } catch (err) {
        console.log(err);
      }
    }
  }


  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const renderStepContent = (stepCount) => {
    switch (stepCount) {
      case 0: return (
        <div>
          <h3>Basic Job Details</h3>
          <div className='p-3 row'>
            <TextField value={jobDetails.companyName} onChange={e => setJobDetails({ ...jobDetails, companyName: e.target.value })} id="standard-basic-cname" className='mb-3' label="Company Name" variant="standard" />
            <TextField value={jobDetails.role} onChange={e => setJobDetails({ ...jobDetails, role: e.target.value })} id="standard-basic-role" className='mb-3' label="Role / Position" variant="standard" />
            <TextField value={jobDetails.location} onChange={e => setJobDetails({ ...jobDetails, location: e.target.value })} id="standard-basic-location" className='mb-3' label="Location" variant="standard" />
            <TextField value={jobDetails.jobType} onChange={e => setJobDetails({ ...jobDetails, jobType: e.target.value })} id="standard-basic-jtype" className='mb-3' label="Job Type" variant="standard" />

          </div>
        </div>
      )
      case 1: return (
        <div>
          <h3>Application Info</h3>
          <div className='p-3 row'>
            <TextField value={jobDetails.appliedVia} onChange={e => setJobDetails({ ...jobDetails, appliedVia: e.target.value })} id="standard-basic-asource" className='mb-3' label="Applied Source" variant="standard" />
            <TextField value={jobDetails.appliedDate} onChange={e => setJobDetails({ ...jobDetails, appliedDate: e.target.value })} type="date" slotProps={{ inputLabel: { shrink: true } }} id="standard-basic-adate" className='mb-3' label="Applied Date" variant="standard" />
            <TextField value={jobDetails.salary} onChange={e => setJobDetails({ ...jobDetails, salary: e.target.value })} id="standard-basic-salary" className='mb-3' label="Salary" variant="standard" />
            <TextField value={jobDetails.workmode} onChange={e => setJobDetails({ ...jobDetails, workmode: e.target.value })} id="standard-basic-workmode" className='mb-3' label="Workmode" variant="standard" />
            <TextField value={jobDetails.techStack} onChange={e => setJobDetails({ ...jobDetails, techStack: e.target.value })} id="standard-basic-techstack" className='mb-3' label="Tech Stack Required" variant="standard" />

          </div>
        </div>
      )
      case 2: return (
        <div className='p-3 row'>
          <h3>Application Status & Notes</h3>
          <FormControl variant="standard" fullWidth>
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={jobDetails.status}
              label="Status"
              onChange={e => setJobDetails({ ...jobDetails, status: e.target.value })}
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
            <FormControlLabel control={<Checkbox checked={jobDetails.interviewProgress.onlineAssessment} onChange={(e) => setJobDetails({ ...jobDetails, interviewProgress: { ...jobDetails.interviewProgress, onlineAssessment: e.target.checked } })} />} label="Online Assessment" />

            <FormControlLabel control={<Checkbox checked={jobDetails.interviewProgress.machineTest} onChange={(e) => setJobDetails({ ...jobDetails, interviewProgress: { ...jobDetails.interviewProgress, machineTest: e.target.checked } })} />} label="Machine Test" />

            <FormControlLabel control={<Checkbox checked={jobDetails.interviewProgress.technicalRound} onChange={(e) => setJobDetails({ ...jobDetails, interviewProgress: { ...jobDetails.interviewProgress, technicalRound: e.target.checked } })} />} label="Technical Round" />

            <FormControlLabel control={<Checkbox checked={jobDetails.interviewProgress.managerialRound} onChange={(e) => setJobDetails({ ...jobDetails, interviewProgress: { ...jobDetails.interviewProgress, managerialRound: e.target.checked } })} />} label="Managerial Round" />

            <FormControlLabel control={<Checkbox checked={jobDetails.interviewProgress.hrRound} onChange={(e) => setJobDetails({ ...jobDetails, interviewProgress: { ...jobDetails.interviewProgress, hrRound: e.target.checked } })} />} label="HR Round" />

          </FormGroup>

          <TextField value={jobDetails.notes} onChange={e => setJobDetails({ ...jobDetails, notes: e.target.value })} id="standard-basic-notes" className='mt-3' label="Points to note" multiline rows={3} variant="standard" />


        </div>
      )
      default: return null
    }
  }



  return (
    <>
      <div className='container p-5 my-3 '>
        <Box sx={{ width: '100%' }}>
          <Stepper activeStep={activeStep} >
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};

              if (isStepSkipped(index)) {
                stepProps.completed = false;
              }
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - you&apos;re finished
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button onClick={handleReset}>Reset</Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
              <Box>
                {renderStepContent(activeStep)}
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />

                {activeStep === steps.length - 1 ?
                  <Button onClick={handleAddJob}>Finish</Button> :
                  <Button onClick={handleNext}>Next</Button>}

              </Box>
            </React.Fragment>
          )}
        </Box>
      </div>
      <CustomSnackbar open={snack.open} message={snack.message} severity={snack.severity} onClose={() => {
        setSnack({ ...snack, open: false })
        if (snack.severity == "success") {
          navigate('/jobs')
        }
      }} />
    </>

  );
}

export default AddJob