import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { collection, addDoc, Firestore } from '@angular/fire/firestore';
import { inject } from '@angular/core';


@Component({
  selector: 'app-doctor-appointment',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './doctor-appointment.component.html',
  styleUrl: './doctor-appointment.component.css'
})
export class DoctorAppointmentComponent implements OnInit {

   firestore = inject(Firestore);
  doctorId!: string;
  slot!: string;
  appointmentForm!: FormGroup;

  constructor(private route: ActivatedRoute,private fb: FormBuilder, private router:Router) {}

  ngOnInit(): void {
     this.doctorId = this.route.snapshot.paramMap.get('id')!;
    this.slot = decodeURIComponent(this.route.snapshot.paramMap.get('slot')!);
     this.appointmentForm = this.fb.group({
      patientName: ['', Validators.required],
      contactNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      slot: [{ value: this.slot, disabled: true }],
    });
  }



  async submitAppointment() {
    if (this.appointmentForm.invalid) return;

    const formValue = this.appointmentForm.getRawValue(); // to include disabled 'slot'
    const appointment = {
      doctorId: this.doctorId,
      ...formValue,
      slot: this.slot,
      createdAt: new Date(),
    };

    try {
      const appointmentsRef = collection(this.firestore, 'appointments');
      await addDoc(appointmentsRef, appointment);
      alert('Appointment booked successfully!');
      this.appointmentForm.reset({ slot: this.slot });
      this.router.navigate(['/appointments'])
    } catch (error) {
      console.error('Error booking appointment:', error);
      alert('Error booking appointment. Please try again.');
    }
  }


}
