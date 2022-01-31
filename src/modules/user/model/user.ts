import { Salary } from "./salary";

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