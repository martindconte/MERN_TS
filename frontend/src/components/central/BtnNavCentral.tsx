import { Link, useLocation, useNavigate } from "react-router-dom";

export const BtnNavCentral = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="w-full text-sm font-oswald py-5 flex justify-center items-stretch gap-4">
      <button
        onClick={() => navigate(-1)}
        className="basis-1/2 uppercase flex justify-center items-center bg-red-800 py-2 px-3 text-white rounded-lg text-sm font-semibold hover:bg-red-400 hover:text-black"
      >
        <span className="material-symbols-outlined mr-2">arrow_back</span>Atras
      </button>

      {location.pathname.includes("search") ? (
        <Link
          to="../new"
          className="basis-1/2 uppercase text-center bg-teal-500 py-2 px-3 text-white rounded-lg text-sm font-semibold hover:bg-green-400 hover:text-black"
        >
          Crear Central
        </Link>
      ) : (
        <Link
          to="../search"
          className="basis-1/2 uppercase text-center bg-teal-500 py-2 px-3 rounded-lg text-sm font-semibold hover:bg-green-400 hover:text-black"
        >
          Buscar Central
        </Link>
      )}
    </div>
  );
};
