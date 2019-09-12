export interface User {
  id: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  email: string;
  password: string;
  employee_id: string;
  dob: Date;
  doj: Date;
  organization_id: string;
  role_id: string;
  active: boolean;
  created: Date;
  modified: Date;
}
