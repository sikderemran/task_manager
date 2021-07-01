import React,{Component} from 'react';
import { Card,Button,Modal,Row,Col,Form,Table} from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import axios from 'axios';
import Sidebar from './Sidebar';
class Employee extends Component{
    state={
        newTask:false,
        name:'',
        email:'',
        password:'',
        image:'',
        validated:false,
    }
    imageChange=(e)=>
    {
        this.setState({
            [e.target.name]: e.target.files[0]
        });
    }
    formOnChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    formSubmit=(e)=>{
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
        }
        this.setState({
            // newTask:!this.state.newTask,
            validated:true,
        })
       this.props.addEmployee(this.state)
       
    }
    newTaskModal=()=>{
        this.setState({
            newTask:!this.state.newTask
        })
    }
    componentDidMount(){
        this.props.add()
    }

    employeDelete=(id)=>{
        this.props.employeDelete(id)
    }
   
    render(){
        return(
            <>
               <Modal show={this.state.newTask} onHide={this.newTaskModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Employee</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form noValidate validated={this.state.validated} onSubmit={this.formSubmit}>
                            <Form.Row>
                                <Form.Group as={Col} md="12" controlId="validationCustom03">
                                    <Form.Label>Image</Form.Label>
                                    <Form.Control required type="file"  name="image" onChange={this.imageChange} />
                                    {
                                        
                                        this.props.employeeError!=undefined?(
                                        this.props.employeeError.data!=undefined?
                                        <Form.Control.Feedback style={{display:'block'}} type="invalid" >{this.props.employeeError.data.errors.image}</Form.Control.Feedback>
                                        :
                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>)
                                        :<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    }
                                </Form.Group>
                                <Form.Group as={Col} md="12" controlId="validationCustom01">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        onChange={this.formOnChange}
                                        name="name"
                                        required
                                        type="text"
                                        placeholder=""
                                    />
                                        {
                                            this.props.employeeError!=undefined?
                                            this.props.employeeError.data!=undefined?
                                            <Form.Control.Feedback style={{display:'block'}} type="invalid" >{this.props.employeeError.data.errors.name}</Form.Control.Feedback>
                                            :
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            :<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        }
                                </Form.Group>
                                <Form.Group as={Col} md="12" controlId="validationCustom02">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        onChange={this.formOnChange}
                                        name="email"
                                        required
                                        type="email"
                                        placeholder=""
                                    />
                                {
                                        
                                        this.props.employeeError!=undefined?(
                                        this.props.employeeError.data!=undefined?
                                        <Form.Control.Feedback style={{display:'block'}} type="invalid" >{this.props.employeeError.data.errors.email}</Form.Control.Feedback>
                                        :
                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>)
                                        :<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    }
                                </Form.Group>

                                <Form.Group as={Col} md="12" controlId="validationCustom03">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        onChange={this.formOnChange}
                                        name="password"
                                        required
                                        type="password"
                                        placeholder=""
                                    />
                                {
                                        
                                        this.props.employeeError!=undefined?(
                                        this.props.employeeError.data!=undefined?
                                        <Form.Control.Feedback style={{display:'block'}} type="invalid" >{this.props.employeeError.data.errors.password}</Form.Control.Feedback>
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
                <Sidebar/>
                <Col className="mt-4" xs={9}>
                    <Row>
                        <Col className="mt-4" xs={3}>
                            <div className="float-right" >
                                <Button onClick={this.newTaskModal} style={{borderRadius:'20px'}} variant="secondary">+ Add Employee</Button>
                            </div>
                        </Col>
                        
                        
                        <Table className="mt-3"  striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                this.props.employes!=undefined?
                                this.props.employes.map(user=>{
                                    return <tr key={user.id}>
                                                <td>{user.id}</td>
                                                <td><img style={{width:'100px',height:'auto'}} src={`/asset/img/${user.image}`}/></td>
                                                <td>{user.name}</td>
                                                <td>{user.email}</td>
                                                <td>
                                                    <div style={{letterSpacing:'8px'}}>
                                                        <i style={{cursor:'pointer'}} onClick={()=>this.employeDelete(user.id)} className="far fa-trash-alt">
                                                            </i>
                                                        <Link to={`/employeeEdit/${user.id}`} style={{fontWeight:'700'}} ><i className="far fa-edit"></i></Link>
                                                    </div>
                                                </td>
                                            </tr>
                                }):''
                            }
                              </tbody>
                        </Table>
                    </Row>
                </Col>
            </>
        )

    }
}
function mapStateToTask(state)
{
    return {
        employes:state.employes,
        employeeError:state.employeeError
    }
}

function mapDispatchToTask(dispatch)
{
    return {
        add:()=>
        {
            axios.get('/employes')
                .then(response=>{
                    dispatch({
                        type:'EMPLOYES_SUCCESS',
                        payload:response.data
                    })
                }).catch(error=>{
                   
                })
        },
        addEmployee:($data)=>
        {
            let fd = new FormData()
            fd.append("image",$data.image);
            fd.append("name",$data.name);
            fd.append("email",$data.email);
            fd.append("password",$data.password);

            axios.post('/employee/store',fd)
                .then(response=>{
                    dispatch({
                        type:'ADD_EMPLOYEE',
                        payload:response.data
                    })
                }).catch(error=>{
                    console.log(error.response)
                    dispatch({
                        type:'EMPLOYEE_ERROR',
                        payload:error.response
                    })
                })
        },
        employeDelete:($data)=>
        {
            const id=$data
            axios.delete(`/employee/delete/${$data}`)
            .then(response=>{
              
                dispatch({
                    type:'EMPLOYEE_DELETE',
                    payload:id
                })
            }).catch(error=>{
                console.log(error)
            })
        }
    }
}


export default connect(mapStateToTask,mapDispatchToTask)(Employee);
