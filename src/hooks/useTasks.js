import axios from "axios";
import {API_ENDPOINT} from "../constants";
import {AuthContext} from "../hooks/useAuth";
import {useContext, useState} from "react";

export const useTasks = () => {

    const auth  = useContext(AuthContext);
    const [taskList,setTaskList] = useState([]);
    const [error,setError] = useState(null);
    const [processing,setProcessing] = useState(false);
    const [taskRemoved,setTaskRemoved]  = useState(null);
    const [taskUodated,setTaskUpdated] = useState(null);

    const list = async () =>{
        try{
            setProcessing(true);
            setError(null);
            const response = await axios.get(`${API_ENDPOINT}/tasks?sort=whenToDo,asc`,buildAuthHeader());
            setTaskList(response.data.content);
            setProcessing(false);

        }catch (error){
            handleError(error);
        }

    }

    const remove = async (taskToRemove)=> {
        try {
            await axios.delete(`${API_ENDPOINT}/tasks/${taskToRemove.id}`, buildAuthHeader());
            setTaskList(taskList.filter(task=> taskToRemove.id!== task.id));
            setTaskRemoved(taskToRemove);
        }
        catch(error){
            handleError(error);
        }
    }

    const save = async (taskToSave,onlyStatus =false) =>  {
        try{
            setProcessing(!onlyStatus);
            setError(false);
            setTaskUpdated(null);

            if (taskToSave.id===0) {
                setProcessing(true);
                await axios.post(`${API_ENDPOINT}/tasks/`, taskToSave, buildAuthHeader());
            }
            else {
                await axios.put(`${API_ENDPOINT}/tasks/${taskToSave.id}`,taskToSave,buildAuthHeader())
            }
            setProcessing(false);
            setTaskUpdated(taskToSave);

        }catch(error){
            handleError(error);
        }
    }

    const clearTaskRemoved = () =>{
        setTaskRemoved(null);
    }

    const clearTaskUpdated = () =>{
        setTaskUpdated(null);
    }

    const buildAuthHeader = () =>{
        return{
            headers:{
                'Authorization':`Bearer ${auth.credentials.token}`
            }
        }
    }

    const handleError = (error) =>{
        console.log(error);
        const resp = error.response;

        if (resp && resp.status === 400 & resp.data){
            setError(resp.data.error);
        }else{
            setError(error.message);
        }
        setProcessing(false);
    }

    return {taskList,error,processing,taskRemoved,taskUodated
        , list,remove,clearTaskRemoved,save,clearTaskUpdated};

}