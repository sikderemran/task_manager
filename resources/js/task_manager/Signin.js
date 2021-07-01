import React,{ Component } from 'react';
import { Button,Col,Form} from 'react-bootstrap';
import { connect } from 'react-redux';
class Signin extends Component {
   
    state={
        validated:false,
        name:'',
        password:''
    }
      formOnChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
     handleSubmit = (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
        }
        this.setState({
            validated:true
        })
        this.props.employeeSignin(this.state)
        
    };
    componentDidUpdate(){
        if(this.props.signin!=undefined && this.props.signin!=''){
            this.props.history.push('/');
        }
    }
    render(){
        return(
            <>
            <Col className="mt-4" xs={4}></Col>
            <Col className="mt-4" xs={4}>
                <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
                    <Form.Row>
                        <Form.Group as={Col} md="12" controlId="validationCustom01">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                onChange={this.formOnChange}
                                name="email"
                                required
                                type="email"
                                placeholder=""
                            />

                           
                            {
                                this.props.signinError!=undefined?
                                this.props.signinError.data!=undefined?
                                <Form.Control.Feedback style={{display:'block'}} type="invalid" >{this.props.signinError.data.errors.email}</Form.Control.Feedback>
                                :
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                :<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            }
                        </Form.Group>
                        <Form.Group as={Col} md="12" controlId="validationCustom02">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                onChange={this.formOnChange}
                                name="password"
                                required
                                type="password"
                                placeholder=""
                            />
                           {
                                
                                this.props.signinError!=undefined?(
                                this.props.signinError.data!=undefined?
                                <Form.Control.Feedback style={{display:'block'}} type="invalid" >{this.props.signinError.data.errors.password}</Form.Control.Feedback>
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
            </Col>
            <Col className="mt-4" xs={4}></Col>
            </>
        )
    }
     
  }

  function mapStateToTask(state)
    {
        return {
            signin:state.signin,
            signinError:state.signinError
        }
    }

  function mapDispatchToTask(dispatch)
    {
        return {
            employeeSignin:($data)=>
            {
                axios.post('/login',$data)
                    .then(response=>{
                        dispatch({
                            type:'EMPLOYEE_SIGNIN',
                            payload:response.data
                        })
                    }).catch(error=>{
                       
                        dispatch({
                            type:'EMPLOYEE_SIGNIN_ERROR',
                            payload:error.response
                        })
                    })
            }
        
        }
        
    }

export default connect(mapStateToTask,mapDispatchToTask)(Signin);
  
