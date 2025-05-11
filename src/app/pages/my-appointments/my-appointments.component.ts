import { Component, OnInit, inject } from '@angular/core';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';

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

 async ngOnInit() {
    try {
      const appointmentsRef = collection(this.firestore, 'appointments');
      const snapshot = await getDocs(appointmentsRef);

      this.appointments = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (err) {
      console.error(err);
      this.error = 'Failed to load appointments.';
    } finally {
      this.loading = false;
    }
  }
}
