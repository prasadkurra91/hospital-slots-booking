import { Component, OnInit, inject } from '@angular/core';
import { Firestore, collection, getDocs, doc, getDoc } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import { IDoctor } from '../../models/doctor.model';
import { IAppointment } from '../../models/appointment.model';
import { addDoc,deleteDoc,updateDoc } from 'firebase/firestore';

@Component({
  selector: 'app-my-appointments',
  imports: [CommonModule],
  templateUrl: './my-appointments.component.html',
  styleUrl: './my-appointments.component.css'
})
export class MyAppointmentsComponent implements OnInit {

  firestore = inject(Firestore);
  appointments: any[] = [];
  loading = true;
  error: string | null = null;


  cancellable:boolean=false;

 async ngOnInit() {
    try {

      const appointmentsRef = collection(this.firestore, 'appointments');
      const snapshot = await getDocs(appointmentsRef);

      const appointmentsData = await Promise.all(
        snapshot.docs.map(async docSnap => {
          const rawData = docSnap.data() as IAppointment;
          const appointment = { id: docSnap.id, ...rawData };

          // Fetch associated doctor data
          const doctorRef = doc(this.firestore, `doctors/${appointment.doctorId}`);
          const doctorSnap = await getDoc(doctorRef);

          let cancellable = false;
          if (doctorSnap.exists()) {
            const doctorData = doctorSnap.data() as IDoctor;
            cancellable = doctorData.cancellable;
          }

          return {
            ...appointment,
            cancellable
          };
        })
      );

      this.appointments = appointmentsData;


    } catch (err) {
      console.error(err);
      this.error = 'Failed to load appointments.';
    } finally {
      this.loading = false;
    }
  }




  async cancelAppointment(appointmentId: string, doctorId: string, slotTime: string) {
  const confirmCancel = confirm('Are you sure you want to cancel this appointment?');
  if (!confirmCancel) return;

  try {
    // 1. Delete the appointment
    const appointmentRef = doc(this.firestore, `appointments/${appointmentId}`);
    await deleteDoc(appointmentRef);

    // 2. Unmark the booked slot
    const doctorRef = doc(this.firestore, `doctors/${doctorId}`);
    const doctorSnap = await getDoc(doctorRef);

    if (doctorSnap.exists()) {
      const doctorData = doctorSnap.data() as IDoctor;
      const updatedSlots = doctorData.availableSlots.map(slot =>
        slot.time === slotTime ? { ...slot, isBooked: false } : slot
      );

      await updateDoc(doctorRef, { availableSlots: updatedSlots });
    }

    // 3. Remove canceled appointment from view
    this.appointments = this.appointments.filter(a => a.id !== appointmentId);
    alert('Appointment canceled successfully!');
  } catch (error) {
    console.error('Error canceling appointment:', error);
    alert('Failed to cancel appointment.');
  }
}
}
