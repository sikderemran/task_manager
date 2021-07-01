import React,{Component} from 'react';
import { Card,Button,Modal,Row,Col,Form} from 'react-bootstrap';
import { connect } from 'react-redux';
import Sidebar from './Sidebar';

export default class NotFound extends Component{
    render(){
        return(
            <>
                <Sidebar/>
            </>
        )
    }
}