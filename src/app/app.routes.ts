import { Routes } from '@angular/router';
import { DoctorListComponent } from './pages/doctor-list/doctor-list.component';
import { DoctorDetailsComponent } from './pages/doctor-details/doctor-details.component';
import { DoctorAppointmentComponent } from './pages/doctor-appointment/doctor-appointment.component';
import { MyAppointmentsComponent } from './pages/my-appointments/my-appointments.component';
import { TestimonialsComponent } from './pages/dumb/testimonials/testimonials.component';
import { FeedbackComponent } from './pages/dumb/feedback/feedback.component';

export const routes: Routes = [
    {
         path: '', 
         component: DoctorListComponent
    },
    {
        path: 'doctor/:id',
        component:DoctorDetailsComponent
    },
    {
        path: 'book/:id/:slot', 
        component:DoctorAppointmentComponent
    },
    {
        path: 'appointments', 
        component:MyAppointmentsComponent
    },
    {
        path:'testimonials',
        component:TestimonialsComponent
    },
    {
        path:'feedback',
        component:FeedbackComponent
    }
];
