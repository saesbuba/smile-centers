import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class TransformPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const validQueryParameters = ['zone', 'centerType', 'serviceName'];

    const transformedQueryParameters = Object.keys(value).reduce(
      (newQueryParameters, valueKey) => {
        const queryParameterValue = value[valueKey].toLowerCase().trim();
        if (
          validQueryParameters.includes(valueKey) &&
          queryParameterValue !== ''
        ) {
          newQueryParameters = {
            ...newQueryParameters,
            [valueKey]: value[valueKey].toLowerCase().trim(),
          };
        }
        return newQueryParameters;
      },
      {},
    );

    if (Object.keys(transformedQueryParameters).length === 0) return undefined;
    return transformedQueryParameters;
  }
}
