export interface IUser {
  _id?: string;
  email: string;
  password?: string;
  firstname: string;
  lastname: string;
  isAdmin?: boolean;
  followers?: any[];
  following?: any[];
  profilePicture: string;
  coverPicture: string;
  about?: string;
  livesin: string;
  worksAt: string;
  country: string;
  relationship: string;
  createdAt?: string;
  updatedAt?: string;
}
