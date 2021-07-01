import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from 'react-redux';
import store from '../redux/redux';

import { Container,Row} from 'react-bootstrap';
import Task from '../task_manager/Task';
import TaskEdit from '../task_manager/TaskEdit';
import NotFound from '../task_manager/NotFound';
import Employee from '../task_manager/Employes';
import EmployeeEdit from '../task_manager/EmployeeEdit';
import Signin from '../task_manager/Signin';
import Logout from '../task_manager/Logout';
function App() {
    return (
        <>
        <Container fluid className="bg-light">
            <Row>
                <Switch>
                    <Route path='/' exact component={Task} />
                    <Route path='/taskEdit/:id' exact component={TaskEdit} />
                    <Route path='/employee' exact component={Employee} />
                    <Route path='/employeeEdit/:id' exact component={EmployeeEdit} />
                    <Route path='/signin' exact component={Signin} />
                    <Route path='/logout' exact component={Logout} />
                    <Route component={NotFound} />
                </Switch>
            </Row>
        </Container>
        </>
    );
}

export default App;

if (document.getElementById('app')) {
    ReactDOM.render( <Provider store={store}><BrowserRouter><App /></BrowserRouter></Provider>, document.getElementById('app'));
}
