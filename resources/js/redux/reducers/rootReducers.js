import axios from 'axios';
const initialState={
    loading:false,
    tasks:[],
    error:'',
    done:'',
    progress:'',
    toDo:'',
    employes:[],
    signin:[],
    signinError:'',
    taskError:'',
    employeeError:'',
    current:''
}

export default function rootReducer(state=initialState,action)
{

    const {type,payload} = action;
   
    switch(type)
    {
        case "TASK_REQUEST":
            return{
                ...state,
                loading:true
            }
          
        case "TASK_SUCCESS":
            return{

                loading:false,
                tasks:payload[0],
                toDo:payload[1],
                progress:payload[2],
                done:payload[3],
                current:payload[4],
            }
           
        case "TASK_ERROR":
            return{
                loading:false,
                tasks:[],
                error:payload,
            }
        case "ADD_TASK":
            return{
                ...state,
                tasks:[payload[0],...state.tasks],
                current:payload[1]
            }
        case "TASK_ERROR":
            return{
                taskError:payload,
            }
        case "EMPLOYEE_ERROR":
            return{
                employeeError:payload,
            }
        case "DELETE_TASK":
            return{
                ...state,
                tasks:state.tasks.filter(user=>user.id!=payload),
            }
        case "ADD_EMPLOYEE":
            return{
                ...state,
                employes:[payload,...state.employes],
            }
        case "EMPLOYEE_DELETE":
            return{
                ...state,
                employes:state.employes.filter(employe=>employe.id!=payload),
            }
        case "EMPLOYES_SUCCESS":
            return{
                employes:payload,
            }  
        case "EMPLOYEE_SIGNIN":
            return{
                signin:payload,
            }
 
        case "EMPLOYEE_SIGNIN_ERROR":
            return{
                signinError:payload,
            }
        // case "EMPLOYEE_LOGOUT":
        //     return{
        //         signin:state,
        //     }
        default:return state;
    }
    
    
}
