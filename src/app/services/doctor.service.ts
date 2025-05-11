import { inject, Injectable } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { IDoctor } from '../models/doctor.model';
import { Observable } from 'rxjs';
import { doc, docData } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  firestore = inject(Firestore);



  getDoctors(): Observable<IDoctor[]> {
    const doctorRef = collection(this.firestore, 'doctors');
    return collectionData(doctorRef, { idField: 'id' }) as Observable<IDoctor[]>;
  }


  getDoctorById(id: string): Observable<IDoctor> {
  const doctorDoc = doc(this.firestore, `doctors/${id}`);
  return docData(doctorDoc, { idField: 'id' }) as Observable<IDoctor>;
}

  constructor() { }
}
