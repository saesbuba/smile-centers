import Center from "./Center";
// eslint-disable-next-line react/prop-types
const CenterList = ({ smileCenters }) => {
  return (
    <div className="flex flex-col w-[1000px] md:w-1/2 lg:w-4/5 md:h-screen overflow-y-scroll">
      <h2 className="font-black text-3xl text-center mb-5">Smile center list</h2>
      <div className="flex md:justify-start lg:justify-center flex-wrap w-full">
        {smileCenters && smileCenters.length ? (
          <>
            {smileCenters.map((smileCenter) => (
              // eslint-disable-next-line react/jsx-key
              <Center key={smileCenter.internalId} smileCenter={smileCenter} />
            ))}
          </>
        ) : (
          <>
            <h2 className="text-indigo-600 font-bold text-3xl text-center">
              No records found that matches search criteria
            </h2>
          </>
        )}
      </div>
    </div>
  );
};

export default CenterList;
