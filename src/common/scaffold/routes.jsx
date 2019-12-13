import React from 'react';
import {Route} from 'react-router-dom';
import TicketContainer from '../../feature/support/ticket_container';

const Routes = () => (
    <div>
        <Route exact path="/opprett-ticket" component={TicketContainer}/>
    </div>
);

export default Routes;