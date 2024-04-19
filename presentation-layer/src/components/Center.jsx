import DentalCareIcon from "../img/dental.svg";

const Center = ({ smileCenter }) => {
  const { centerIcon } = smileCenter;
  return (
    <div className="mx-4 my-4 bg-white shadow-xl px-5 py-10 rounded-3xl w-[450px] max-w-[450px] max-h-[180px]">
      <div className="flex items-start gap-3">
        <img
          className="w-9 ml-2 mr-3"
          src={centerIcon ? centerIcon : DentalCareIcon}
          alt="Dental care icon"
        />
        <div className="flex flex-col">
          <span className="text-blue-600 font-extrabold text-xl">{smileCenter.centerName}</span>
          <span className="text-red-600 font-extrabold text-xl">¡Hasta $6,400 OFF! 🌕 </span>
          <span className="text-gray-500 font-semibold text-sm">{smileCenter.address}</span>
          <span className="text-gray-500 font-semibold text-sm">
            L-V 10:00-18:00 / S 10:00-18:00
          </span>
        </div>
      </div>
    </div>
  );
};

export default Center;
