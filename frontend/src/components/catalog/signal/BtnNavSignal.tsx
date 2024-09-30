export const BtnNavSignal = () => {
  return (
    <div>BtnNavSignal</div>
  )
}


// import { Link, useLocation, useNavigate } from "react-router-dom";

// export const BtnNavVendor = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   return (
//     <div className="w-full text-xs font-oswald py-5 flex justify-center items-stretch gap-4">
//       <button
//         onClick={() => navigate(-1)}
//         className="basis-1/2 uppercase flex justify-center items-center bg-green-700 py-2 px-3 text-white rounded-lg font-semibold hover:bg-green-400 hover:text-black"
//       >
//         <span className="material-symbols-outlined mr-2">arrow_back</span>Atras
//       </button>

//       {location.pathname.includes("search") ? (
//         <Link
//           to="../new"
//           className="basis-1/2 uppercase flex justify-center items-center gap-3 bg-amber-800 py-2 px-3 text-white rounded-lg font-semibold hover:bg-amber-400 hover:text-black"
//         >
//           <span>Crear Central</span>
//           <span className="material-symbols-outlined mr-2">add_circle</span>
//         </Link>
//       ) : (
//         <Link
//           to=".."
//           className="basis-1/2 uppercase flex justify-center items-center gap-3 bg-amber-800 py-2 px-3 text-white rounded-lg font-semibold hover:bg-amber-400 hover:text-black"
//         >
//           Ver Vendors
//           <span className="material-symbols-outlined mr-2">search</span>
//         </Link>
//       )}
//     </div>
//   );
// };
