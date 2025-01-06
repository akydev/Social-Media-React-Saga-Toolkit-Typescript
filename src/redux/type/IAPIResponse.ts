export interface IUserResponse {
  user: User;
  token: string;
}

export interface User {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  isAdmin: boolean;
  followers: any[];
  following: any[];
  _id: string;
  createdAt: string;
  updatedAt: string;
}
