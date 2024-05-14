import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth/authSlice';
import projectReducer from './projects/projectSlice';
import ticketReducer from './ticket/ticketSlice';
import projectTicketReducer from './project_tickets/projectTicketsSlice';
import searchReducer from './search/searchSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        Project: projectReducer,
        Ticket: ticketReducer,
        ProjectTicket: projectTicketReducer,
        Search: searchReducer,
    }
})

export default store;