export type SalonType = {
  id: string;
  name: string;
  email: string;
  ownerId: string;
  services: string[];
  apointments?: string[];
  timetable: string[];
};
