import { useState } from "react";
import Error from "./Error";
import { SmileCenterService } from "../services/SmileCenter";

const Form = ({ setSmileCenters, error, setError }) => {
  const [filters, setFilters] = useState({ serviceName: "", zone: "", centerType: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const smileCenterService = new SmileCenterService();
    const data = await smileCenterService.getSmileCenters(filters).catch((error) => {
      setError({ flag: true, message: error.message });
      setTimeout(() => {
        setError({ flag: false, message: "" });
      }, 4000);
    });

    if (!data) return;
    if (data.success) setSmileCenters(data.records);
    return;
  };

  const handleCleanFilters = async () => {
    setFilters({ serviceName: "", zone: "", centerType: "" });
    const smileCenterService = new SmileCenterService();
    const data = await smileCenterService.getSmileCenters(undefined).catch((error) => {
      setError({ flag: true, message: error.message });
      setTimeout(() => {
        setError({ flag: false, message: "" });
      }, 4000);
    });

    if (!data) return;
    if (data.success) setSmileCenters(data.records);
    return;
  };

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
      <h2 className="font-black text-3xl text-center mb-5">Search criteria</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg py-10 px-5 mb-10">
        {error.flag && (
          <Error>
            <p>{error.message}</p>
          </Error>
        )}
        <div className="mb-5">
          <label htmlFor="mascota" className="block text-gray-700 uppercase font-bold">
            Service name
          </label>
          <input
            id="service-name"
            type="text"
            placeholder="Service name"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={filters.serviceName}
            onChange={(e) => setFilters({ ...filters, serviceName: e.target.value })}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="propietario" className="block text-gray-700 uppercase font-bold">
            Center type
          </label>
          <input
            id="center-type"
            type="text"
            placeholder="Center type"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={filters.centerType}
            onChange={(e) => setFilters({ ...filters, centerType: e.target.value })}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="email" className="block text-gray-700 uppercase font-bold">
            Zone
          </label>
          <input
            id="zone"
            type="text"
            placeholder="Zone"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={filters.zone}
            onChange={(e) => setFilters({ ...filters, zone: e.target.value })}
          />
        </div>
        <div className="flex flex-wrap items-center content- justify-between">
          <input
            type="button"
            className="bg-green-500 p-3 text-white uppercase font-bold hover:bg-green-600 cursor-pointer transition-all rounded-md max-w-40"
            value="limpiar filtros"
            onClick={handleCleanFilters}
          />
          <input
            type="submit"
            className="bg-indigo-600 p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all rounded-md w-40"
            value="aplicar filtros"
          />
        </div>
      </form>
    </div>
  );
};

export default Form;
