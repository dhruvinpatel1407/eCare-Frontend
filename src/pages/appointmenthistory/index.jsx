// Client/src/pages/dashboard/index.jsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AppointmentCard from '../../components/card/AppointmentCard';
import { fetchAppointments, cancelAppointment, rescheduleAppointment } from './action';
import { useNavigate } from 'react-router-dom';

const AppointmentHistory = () => {
    const dispatch = useDispatch();
    const { appointments, loading: loadingAppointments } = useSelector(state => state.appointment);
    const navigate = useNavigate();
    
    useEffect(() => {
        dispatch(fetchAppointments());
    }, [dispatch]);

    const isLoading =  loadingAppointments;

    const handleReschedule = (appointments) => {
        navigate(`/reschedule/${appointments._id}`);
        // Open a modal or navigate to the reschedule page
      };
      
      const handleCancel = (appointments) => {
        dispatch(cancelAppointment(appointments._id));
      };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
        
            <h1 className="text-3xl font-bold mt-12 mb-8 text-center">Your Appointments</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {appointments.map((appointment) => (
                    <AppointmentCard 
                        key={appointment._id}
                        data={appointment}
                        onReschedule={handleReschedule} 
                        onCancel={handleCancel}
                    />
                ))}
            </div>
        </div>
    );
};

export default AppointmentHistory;