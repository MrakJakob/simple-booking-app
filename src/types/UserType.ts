export type UserType = {
  uid: string;
  name: string;
  email: string;
  createdAt: Date;
  apointments?: string[];
  salons?: string[];
};