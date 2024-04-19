export interface CenterResponse {
  internalId: string;
  centerName: string;
  address: string;
  centerType: string;
  zone: string;
  appointmentTypeId: number | string;
  calendarId: number;
  centerIcon?: string;
  services: any;
}
