export enum CommunityModule {
  Bills = 'bills',
  Properties = 'properties',
  Owners = 'owners',
  Resolutions = 'resolutions',
  Notifications = 'notifications',
  Calendar = 'calendar',
  Managers = 'managers',
}

export interface Community {
  id: number;
  name: string;
  address: string;
  contact_info: string;
}

export interface CommunityDataApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Community[];
}
