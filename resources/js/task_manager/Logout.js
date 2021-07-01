import React, { Component, Fragment } from 'react';

class Logout extends Component
{
    componentDidMount()
    {
        axios.get('/logout').then(response=>{
            this.props.history.push('/signin');
        }).catch(error=>{
           
        });
    }
    render()
    {
        return(
            <Fragment>
                
            </Fragment>
        )
    }
}

export default Logout;