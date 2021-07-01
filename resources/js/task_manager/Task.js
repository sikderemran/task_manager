import React,{Component} from 'react';
import { Card,Button,Modal,Row,Col,Form} from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import axios from 'axios';
import Sidebar from './Sidebar';
class Task extends Component{
    state={
        newTask:false,
        title:'',
        description:'',
        validated:false,
    }
    newTaskModal=()=>{
        this.setState({
            newTask:!this.state.newTask
        })
    }
    componentDidMount(){
        this.props.add()
        console.log(this.props.current)
    }
    // componentDidUpdate(){
       
    //     if(this.props.current!=undefined){
    //         this.setState({
    //             newTask:!this.state.newTask
    //         })
    //     }
    // }
    formSubmit=(e)=>{
        e.preventDefault();

        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
        }
        this.props.addTask(this.state)
        this.setState({
            // newTask:!this.state.newTask,
            validated:true
        })
    }
    formOnChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    deleteTask=(id)=>{
        this.props.deleteTask(id)
    }
   
    render(){
        return(
            <>
               <Modal show={this.state.newTask} onHide={this.newTaskModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>New Task</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form noValidate validated={this.state.validated} onSubmit={this.formSubmit}>
                            <Form.Row>
                                <Form.Group as={Col} md="12" controlId="validationCustom01">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control
                                        onChange={this.formOnChange}
                                        name="title"
                                        required
                                        type="text"
                                        placeholder=""
                                    />
                                        {
                                            this.props.taskError!=undefined?
                                            this.props.taskError.data!=undefined?
                                            <Form.Control.Feedback style={{display:'block'}} type="invalid" >{this.props.taskError.data.errors.title}</Form.Control.Feedback>
                                            :
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            :<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        }
                                </Form.Group>
                                <Form.Group as={Col} md="12" controlId="validationCustom02">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        onChange={this.formOnChange}
                                        name="description"
                                        required
                                        placeholder=""
                                    />
                                {
                                        
                                        this.props.taskError!=undefined?(
                                        this.props.taskError.data!=undefined?
                                        <Form.Control.Feedback style={{display:'block'}} type="invalid" >{this.props.taskError.data.errors.description}</Form.Control.Feedback>
                                        :
                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>)
                                        :<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    }
                                </Form.Group>
                            </Form.Row>
                            <Form.Group className="mb-3 float-right" controlId="exampleForm.ControlTextarea1">
                                <Button type="submit">Signin</Button>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                </Modal>
                <Sidebar user={this.props.current} />
                <Col className="mt-4" xs={9}>
                    <Row>
                        <Col className="mt-4" xs={4}>
                            To do ({this.props.toDo})
                            <div className="float-right" >
                                <Button onClick={this.newTaskModal} style={{borderRadius:'20px'}} variant="secondary">+ New Task</Button>
                            </div>
                        </Col>
                        <Col className="mt-4" xs={4}>
                            In Progress ({this.props.progress})
                            <div className="float-right" >
                                <Button onClick={this.newTaskModal} style={{borderRadius:'20px'}} variant="secondary">+ New Task</Button>
                            </div>
                        </Col>
                        <Col className="mt-4" xs={4}>
                            Done({this.props.done})
                        </Col>
                        
                            {
                               this.props.tasks!=undefined?
                                this.props.tasks.map(task=>{
                                
                                    return <Col key={task.id} xs={4}>
                                            <Card className="mt-5" style={{ width: '18rem' }}>
                                                <Card.Body>
                                                    <p onClick={()=>this.deleteTask(task.id)} style={{fontWeight:'700',cursor:'pointer'}} className="float-right"><i className="far fa-trash-alt"></i></p>
                                                    <Card.Title>{task.title}</Card.Title>
                                                    <Card.Text>
                                                        {task.description}
                                                    </Card.Text>
                                                    <Card.Img style={{width:'100px',height:'100px',borderRadius:'50%'}} variant="top" src={`asset/img/${task.user.image}`}/>
                                                    <Link to={`/taskEdit/${task.id}`} style={{fontWeight:'700'}} className="float-right">...</Link>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                }):''
                            }
                    </Row>
                </Col>
            </>
        )

    }
}
function mapStateToTask(state)
{
    console.log(state.tasks)
    return {
        tasks:state.tasks,
        toDo:state.toDo,
        done:state.done,
        progress:state.progress,
        signin:state.signin,
        taskError:state.taskError,
        current:state.current
    }
}

function mapDispatchToTask(dispatch)
{
    return {
        add:()=>
        {
            
            axios.get('/task')
                .then(response=>{
                    console.log(response.data)
                    if(response.data[4]==null){
                        window.location.href='/signin';
                    }
                    dispatch({
                        type:'TASK_SUCCESS',
                        payload:response.data
                    })
                }).catch(error=>{
                    
                })
        },
        addTask:($data)=>
        {
            axios.post('task/store',$data)
                .then(response=>{
                    dispatch({
                        type:'ADD_TASK',
                        payload:response.data
                    })
                }).catch(error=>{
                    dispatch({
                        type:'TASK_ERROR',
                        payload:error.response
                    })
                })
        },
        deleteTask:($data)=>
        {
            const id=$data
            axios.delete(`/task/delete/${$data}`)
            .then(response=>{

                dispatch({
                    type:'DELETE_TASK',
                    payload:id
                })
            }).catch(error=>{
               
            })
        }
    }
}


export default connect(mapStateToTask,mapDispatchToTask)(Task);
