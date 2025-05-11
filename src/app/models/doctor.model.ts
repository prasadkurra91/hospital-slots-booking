export interface IDoctor {
  id: string;
  name: string;
  specialty: string;
  experience: number;
  bio: string;
  location: string;
  availableSlots: string[];  // e.g., ['10:00 AM', '11:00 AM']
}