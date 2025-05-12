export interface IAppointment {
  id?: string;             // Optional, useful if storing in Firestore
  doctorId: string;
  doctorName: string;      // Redundant but useful for display
  patientName: string;
  contactNumber: string;
  timeSlot: string;        // e.g., '10:00 AM'
  bookedAt: Date;        // Timestamp of when appointment was created
  cancellable:boolean;
}
