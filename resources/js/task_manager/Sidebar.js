import React, { Component } from 'react';
import { Card,Button,ListGroup,Container,Row,Col} from 'react-bootstrap';
import { Link } from "react-router-dom";
class Sidebar extends Component{
    render(){
        return(
            <>
                <Col className="mt-4" xs={3}>
                    <ListGroup>
                        <ListGroup.Item >
                            Your Id<span>&nbsp;&nbsp;</span>
                            {this.props.user}
                        </ListGroup.Item>
                        <ListGroup.Item >
                            <Link to={'/'}>Task Manager</Link>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Link to={'/employee'}>Employes</Link>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Link to={'/logout'}>Logout</Link>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </>
        )
    }
}


export default Sidebar;