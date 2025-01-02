export interface IGetUser {
  id: number;
}

export interface IGetUserResponse {
  success: boolean;
  message: string;
  data: {
    user: {
      basicPayForThisMonth: number;
      committedHoursForThisMonth: number;
    };
  };
}
