import { Salary } from "./salary";
export interface RegisterUser {
  name: string,
  lastName: string,
  emailAddress: string,
  phoneNumber: string,
  accountNumber: string
}

export interface User {
  id: number,
  name: string,
  lastName: string,
  emailAddress: string,
  phoneNumber: string,
  accountNumber: string,
  role: string,
  priority : boolean,
  salaryDto : Salary
}

export interface PreparationStaff extends User {
  priority: boolean
}


