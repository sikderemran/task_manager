import React,{Component} from 'react';
import {Col,Form,Button} from 'react-bootstrap';
import axios from 'axios';
import Sidebar from './Sidebar';

export default class EmployeeEdit extends Component{
    state={
        newTask:false,
        name:'',
        email:'',
        password:'',
        image:'',
        imageError:0,
        nameError:0,
        emailError:0,
        passwordError:0,
        validated:false,
    }
    imageChange=(e)=>
    {
        this.setState({
            [e.target.name]: e.target.files[0]
        });
    }
    componentDidMount(){
        const id=this.props.match.params.id;
        axios.get(`/get/employee/${id}`)
        .then(response=>{
            this.setState({
                name:response.data.name,
                email:response.data.email,
                id:id
            })
            
        }).catch(error=>{
            console.log(error)
        })
    }
    formOnChange=(e)=>{
        console.log(e.target.value)
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    formSubmit=(e)=>{
        e.preventDefault();
        let fd = new FormData()
        fd.append("id",this.state.id);
        fd.append("image",this.state.image);
        fd.append("name",this.state.name);
        fd.append("email",this.state.email);
        fd.append("password",this.state.password);

        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
        }
        this.setState({
            // newTask:!this.state.newTask,
            validated:true,
        })

        axios.post('/employee/update',fd).then(response=>{
                    this.props.history.push('/employee');
                }).catch(error=>{
                    this.setState({
                        imageError:error.response.data.errors.image,
                        nameError:error.response.data.errors.name,
                        emailError:error.response.data.errors.email,
                        passwordError:error.response.data.errors.password,
                    })
                })
    }

    render(){
        return(
            <>
                <Sidebar/>
                <Col className="mt-4" xs={6}>
                <Form noValidate validated={this.state.validated} onSubmit={this.formSubmit}>
                            <Form.Row>
                                <Form.Group as={Col} md="12" controlId="validationCustom03">
                                    <Form.Label>Image</Form.Label>
                                    <Form.Control required type="file"  name="image" onChange={this.imageChange} />
                                    {
                                        
                                        this.state.imageError!=0?
                                        <Form.Control.Feedback style={{display:'block'}} type="invalid" >{this.state.imageError}</Form.Control.Feedback>
                                        :
                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        
                                    }
                                </Form.Group>
                                <Form.Group as={Col} md="12" controlId="validationCustom01">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        onChange={this.formOnChange}
                                        name="name"
                                        required
                                        type="text"
                                        value={this.state.name}
                                    />
                                        {
                                            this.state.nameError!=0?
                                            <Form.Control.Feedback style={{display:'block'}} type="invalid" >{this.state.nameError}</Form.Control.Feedback>
                                            :
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        }
                                </Form.Group>
                                <Form.Group as={Col} md="12" controlId="validationCustom02">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        onChange={this.formOnChange}
                                        name="email"
                                        required
                                        type="email"
                                        value={this.state.email}
                                    />
                                    {
                                        
                                        this.state.emailError!=0?
                                        <Form.Control.Feedback style={{display:'block'}} type="invalid" >{this.state.emailError}</Form.Control.Feedback>
                                        :
                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    }
                                </Form.Group>
                                <Form.Group as={Col} md="12" controlId="validationCustom04">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        onChange={this.formOnChange}
                                        name="password"
                                        required
                                        type="password"
                                       
                                    />
                                    {
                                        
                                        this.state.passwordError!=0?
                                        <Form.Control.Feedback style={{display:'block'}} type="invalid" >{this.state.passwordError}</Form.Control.Feedback>
                                        :
                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    }
                                </Form.Group>
                            </Form.Row>
                            <Form.Group className="mb-3 float-right" controlId="exampleForm.ControlTextarea1">
                                <Button type="submit">Signin</Button>
                            </Form.Group>
                        </Form>
                </Col>
                    
            </>
        )
    }
}