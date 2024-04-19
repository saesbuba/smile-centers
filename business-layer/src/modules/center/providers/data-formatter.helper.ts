import { Injectable } from '@nestjs/common';
import { CenterResponse } from '../models/center-response';

@Injectable()
export class DataFormatterHelper {
  formatCenters(centers: any[], serviceName?: string): Array<CenterResponse> {
    return centers.reduce((accumulator, center) => {
      const {
        Center_Name,
        Street,
        Number,
        Apt,
        City,
        Country,
        Calendar_Id,
        Appointment_Type_Id,
        Services: services,
        Center_Type: centerType,
        Zone: zone,
        Center_Icon,
      } = center;

      const appointmentIdFromServicesObject = serviceName
        ? services[serviceName]['AppointmentTypeId']
        : undefined;

      if (
        !Appointment_Type_Id &&
        (!appointmentIdFromServicesObject ||
          appointmentIdFromServicesObject.trim() === '')
      )
        return accumulator;

      let finalAppointmentTypeId;
      if (serviceName) {
        if (appointmentIdFromServicesObject)
          finalAppointmentTypeId = appointmentIdFromServicesObject;
        else return accumulator;
      } else {
        if (Appointment_Type_Id) finalAppointmentTypeId = Appointment_Type_Id;
        else return accumulator;
      }

      accumulator = [
        ...accumulator,
        {
          internalId: this.generateId(),
          centerName: Center_Name,
          address: `${Street ?? ''} ${Number ?? ''} ${Apt ?? ''} ${City ?? ''} ${Country ?? ''}`,
          centerType,
          zone,
          appointmentTypeId: finalAppointmentTypeId,
          calendarId: Calendar_Id,
          centerIcon: Center_Icon,
          services,
        },
      ];
      return accumulator;
    }, []);
  }

  generateId = (): string => {
    const random = Math.random().toString(36).substring(2);
    const date = Date.now().toString(36);
    return random + date;
  };
}
