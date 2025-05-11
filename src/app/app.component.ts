import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { DoctorListComponent } from "./pages/doctor-list/doctor-list.component";
import { NavbarComponent } from "./pages/navbar/navbar.component";

@Component({
  selector: 'app-root',
  imports: [ RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'hospital-slots-booking';
}
