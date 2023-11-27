export interface IItemsDocs {
  name: string;
}
export interface IDataRegister extends IDataLogin {
  confirmPassword: string;
  email: string;
}

export interface IDataLogin {
  username: string;
  password: string;
}
export interface IUser {
  id: number;
  position: string;
  username: string;
  email: string;
  roles: [
    {
      name: string;
    }
  ];
  firstName: string;
  lastName: string;
}
