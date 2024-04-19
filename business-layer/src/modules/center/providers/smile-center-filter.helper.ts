import { Injectable } from '@nestjs/common';

@Injectable()
export class SmileCenterFilter {
  filterSmileCenters(smileCenters, queryParameters) {
    const { zone, centerType, serviceName } = queryParameters;

    let finalSmileCenters = [...smileCenters];
    if (zone)
      finalSmileCenters = this.filterSmileCentersByZone(
        finalSmileCenters,
        zone,
      );
    if (centerType)
      finalSmileCenters = this.filterSmileCentersByCenterType(
        finalSmileCenters,
        centerType,
      );
    if (serviceName)
      finalSmileCenters = this.filterSmileCentersByServiceName(
        finalSmileCenters,
        serviceName,
      );

    return finalSmileCenters;
  }

  filterSmileCentersByZone(smileCenters, zoneFilterBy) {
    return smileCenters.filter(
      (smileCenter) =>
        smileCenter['Zone']
          .trim()
          .toLowerCase()
          .normalize('NFD')
          .replace(/\p{Diacritic}/gu, '') === zoneFilterBy,
    );
  }

  filterSmileCentersByCenterType(smileCenters, centerTypeFilterBy) {
    return smileCenters.filter(
      (smileCenter) =>
        smileCenter['Center_Type']
          .trim()
          .toLowerCase()
          .normalize('NFD')
          .replace(/\p{Diacritic}/gu, '') === centerTypeFilterBy,
    );
  }
  filterSmileCentersByServiceName(smileCenters, serviceNameFilterBy) {
    return smileCenters.filter((smileCenter) => {
      const serviceNames = Object.keys(smileCenter.Services);
      return serviceNames.includes(serviceNameFilterBy);
    });
  }
}
