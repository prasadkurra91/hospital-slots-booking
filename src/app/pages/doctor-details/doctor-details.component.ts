import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IDoctor } from '../../models/doctor.model';
import { DoctorService } from '../../services/doctor.service';

@Component({
  standalone:true,
  selector: 'app-doctor-details',
  imports: [CommonModule,RouterModule],
  templateUrl: './doctor-details.component.html',
  styleUrl: './doctor-details.component.css'
})
export class DoctorDetailsComponent implements OnInit {
   doctorId!: string;
  doctor!: IDoctor;

   constructor(private route:ActivatedRoute, private doctorService:DoctorService, private router: Router){}

   ngOnInit(): void {
      this.doctorId = this.route.snapshot.paramMap.get('id')!;
      console.log('Doctor ID:', this.doctorId);
      this.fetchDoctor(this.doctorId);
   }
   bookSlot(slot: string) {
    console.log('Booking slot:', slot);
     this.router.navigate(['/book', this.doctor.id,slot])
  }
  fetchDoctor(id: string): void {
    this.doctorService.getDoctorById(id).subscribe((doctor) => {
      this.doctor = doctor;
    });
  }
}
