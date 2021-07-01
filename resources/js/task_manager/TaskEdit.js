import React,{Component} from 'react';
import {Col,Form,Button} from 'react-bootstrap';
import axios from 'axios';
import Sidebar from './Sidebar';

export default class TaskEdit extends Component{
    state={
        title:'',
        description:'',
        status:'',
        id:'',
        titleError:0,
        descriptionError:0,
        validated:false,
    }
    componentDidMount(){
        console.log('ok')
        const id=this.props.match.params.id;
        axios.get(`/get/task/${id}`)
        .then(response=>{
            this.setState({
                title:response.data.title,
                description:response.data.description,
                status:response.data.status,
                id:id
            })
            
        }).catch(error=>{
            
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
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
        }
        this.setState({
            // newTask:!this.state.newTask,
            validated:true
        })
        const taskUpdate={
                title:this.state.title,
                description:this.state.description,
                status:this.state.status,
                id:this.state.id
        }
        axios.post('/task/update',taskUpdate).then(response=>{
                this.props.history.push('/');
            }).catch(error=>{
                console.log(this.state.titleError)
                this.setState({
                    titleError:error.response.data.errors.title,
                    descriptionError:error.response.data.errors.description,
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
                            <Form.Group as={Col} md="12" controlId="validationCustom01">
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    onChange={this.formOnChange}
                                    name="title"
                                    required
                                    type="text"
                                    value={this.state.title}
                                />
                                    {
                                        this.state.titleError!=0?
                                        <Form.Control.Feedback style={{display:'block'}} type="invalid" >{this.state.titleError}</Form.Control.Feedback>
                                        :
                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    }
                            </Form.Group>
                            <Form.Group as={Col} md="12" controlId="validationCustom02">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    onChange={this.formOnChange}
                                    name="description"
                                    required
                                    value={this.state.description}
                                />
                                {
                                    
                                    this.state.descriptionError!=0?
                                    <Form.Control.Feedback style={{display:'block'}} type="invalid" >{this.state.descriptionError}</Form.Control.Feedback>
                                    :
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                }
                            </Form.Group>
                            <Form.Group as={Col} md="12" controlId="validationCustom03">
                                <Form.Label>Status</Form.Label>
                                <Form.Control  name="status" value={this.state.status} as="select" onChange={this.formOnChange} >
                                    <option value="0" disabled >Please select a option</option>
                                    <option value="2">Done</option>
                                    <option value="1">In Progress</option>
                                </Form.Control>
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