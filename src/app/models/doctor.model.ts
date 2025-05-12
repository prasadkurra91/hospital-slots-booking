export interface IDoctor {
  id: string;
  name: string;
  specialty: string;
  experience: number;
  bio: string;
  location: string;
  availableSlots: TimeSlot[]; 
  cancellable:boolean
}


export interface TimeSlot {
  time: string;
  isBooked: boolean;
}