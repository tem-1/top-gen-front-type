export interface EmployeeType {
  _id: string;
  firstname: string;
  registerNumber: string;
  name: string;
  phone: string;
  email: string;
  role: string;
  photo: string;
  status: boolean;
  createdAt: string;
}
interface Lesson {
  createUser: string;
  title: string;
  course: string;
  video: string;
}

export interface SingleCourseState {
  coursname: string;
  file?: any;
  _id: string;
  employee: any;
  category: any;
  price: number;
  photo?: any;
  createdAt?: string;
  updatedAt?: string;
}
