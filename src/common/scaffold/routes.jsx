import React from 'react';
import {Route} from 'react-router-dom';
import DashboardContainer from '../../feature/dashboard/dashboard_container';
import LogOutContainer from '../../feature/log_out/log_out_container';
import TicketContainer from '../../feature/support/ticket_container_new';
import MyTickets from '../../feature/support/my_tickets';

const Routes = () => (
    <div>
        <Route exact path="/" component={DashboardContainer}/>
        <Route exact path="/opprett-ticket" component={TicketContainer}/>
        <Route exact path="/ticket-historikk" component={MyTickets}/>
        <Route exact path="/logg-ut" component={LogOutContainer}/>
    </div>
);

export default Routes;