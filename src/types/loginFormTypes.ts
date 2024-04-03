export type LogInPayload = {
  refresh: string;
  access: string;
}

export type UserData = {
  name: string;
  surname: string;
  id: number;
}

export type Token = {
  token_type: string;
  exp: number;
  iat: number;
  jti: string;
  user_id: number;
  first_name: string;
  last_name: string;
  user_permissions: string[];
}