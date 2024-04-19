export class SmileCenterService {
  #endPoint = "http://localhost:3000/api/v1/center";

  async getSmileCenters(queryParameters) {
    try {
      const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };

      let finalEndPoint = this.#endPoint;

      if (queryParameters && Object.keys(queryParameters).length > 0) {
        const joinedQueryParameters = Object.keys(queryParameters).reduce(
          (accumulator, queryParameterKey) => {
            accumulator = accumulator.concat(
              `${queryParameterKey}=${queryParameters[queryParameterKey]}&`
            );
            return accumulator;
          },
          ""
        );
        finalEndPoint = finalEndPoint.concat(`?${joinedQueryParameters}`);
      }

      const response = await fetch(finalEndPoint, requestOptions).catch((error) => {
        throw new Error("Was an error when trying to get smile centers, try again later");
      });
      const result = await response.json();

      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
