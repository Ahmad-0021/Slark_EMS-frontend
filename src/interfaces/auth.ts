export interface Ilogin {
  email: string;
  password: string;
}

export interface IloginResponse {
  role: { name: string };
  token: string;
}
