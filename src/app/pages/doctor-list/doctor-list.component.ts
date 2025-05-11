import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IDoctor } from '../../models/doctor.model';
import { DoctorService } from '../../services/doctor.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-doctor-list',
  imports: [RouterLink,CommonModule],
  templateUrl: './doctor-list.component.html',
  styleUrl: './doctor-list.component.css'
})
export class DoctorListComponent implements OnInit {
  doctors$!:Observable<IDoctor[]>;
  constructor( private doctorService:DoctorService){}
   ngOnInit() {
    this.doctors$ = this.doctorService.getDoctors();
  }


}
