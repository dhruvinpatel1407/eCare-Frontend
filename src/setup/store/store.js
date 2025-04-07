import  {thunk}  from "redux-thunk";
import { createStore, combineReducers, applyMiddleware } from "redux";

// import Reducers
import dashboardReducer from "../../pages/dashboard/reducer";
import loginReducer from "../../pages/login/reducer";
import signupReducer from "../../pages/signup/reducer";
import appointmentReducer from "../../pages/appointmenthistory/reducer";
import bookingReducer from "../../pages/bookingpage/reducer";
import rescheduleReducer from "../../pages/rescheduleappointment/reducer";
import servicesReducer from "../../pages/services/reducer";
import demographicReducer from "../../pages/demographicdetails/reducer";
import labReportReducer from "../../pages/labreport/reducer";

const rootReducer = combineReducers({
  dashboard: dashboardReducer,
  login: loginReducer,
  signup: signupReducer,
  appointment : appointmentReducer,
  booking : bookingReducer,
  reschedule: rescheduleReducer,
  services : servicesReducer,
  demographic : demographicReducer,
  labReports : labReportReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
