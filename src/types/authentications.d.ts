export type TLoginData = {
  data: {
    access_token: string;
    refresh_token: string;
    role: string;
  };
} & User;

export type TLoginResponse = TLoginData;