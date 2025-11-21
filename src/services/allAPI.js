import commonAPI from "./commonAPI"
import serverURL from "./serverURL"

// add job api:  call in addjob when finish button is clicked
export const addJobAPI = async (jobDetails)=>{
    return await commonAPI("POST",`${serverURL}/jobs`,jobDetails)
}

// view joblist  api: call in JobList when jobs loads (useEffect) to show all jobs
export const viewJobListAPI = async ()=>{
    return await commonAPI("GET",`${serverURL}/jobs`,{})
}

// delete Job : call in joblist when the delete button is clicked
export const removeJobListAPI = async (id)=>{
    return await commonAPI("DELETE",`${serverURL}/jobs/${id}`,{})
}

// view job details: when viewjobs of that job is load(useEffect)
export const viewJobDetailsAPI = async (id)=>{
    return await commonAPI("GET",`${serverURL}/jobs/${id}`,{})
}

// update api: call in edit componen when clicked on update button
export const editJobAPI = async (id,jobDetails)=>{
    return await commonAPI("PUT",`${serverURL}/jobs/${id}`,jobDetails)
}