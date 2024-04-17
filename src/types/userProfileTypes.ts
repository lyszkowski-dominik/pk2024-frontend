export type DetailedUserData = {
  first_name: string;
  last_name: string;
  email: string;
}

export enum Module {
  UserInfo = 'user-info',
  UserSettings = 'user-settings',
  UserHistory = 'user-history'
}