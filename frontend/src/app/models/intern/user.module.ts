export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  joinDate: string;
  
}

export interface UserFormData {
  name: string;
  email: string;
  role: string;
  department: string;
  joinDate: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}