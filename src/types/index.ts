export type IAuthResponse = {
  status: number;
  type: string;
  message: string;
  token: string;
  user: IUser;
  can_access: string;
};

export type IUser = {
  uuid: string;
  name: string;
  department: string;
};
