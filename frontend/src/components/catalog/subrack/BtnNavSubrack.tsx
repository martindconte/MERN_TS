import { Link, useLocation, useNavigate } from 'react-router-dom'

export const BtnNavSubrack = () => {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <div className='w-full text-xs font-roboto py-5 flex justify-center items-stretch gap-4'>
      <button
        onClick={() => navigate(-1)}
        className='basis-1/2 uppercase flex justify-center items-center bg-green-400 py-2 px-3 rounded-lg font-semibold hover:bg-green-600 hover:text-black'
      >
        <span className='material-symbols-outlined mr-2'>arrow_back</span>Atras
      </button>

      {location.pathname.includes('search') ? (
        <Link
          to='../new'
          className='basis-1/2 uppercase flex justify-center items-center gap-3 bg-amber-400 py-2 px-3 text-white rounded-lg font-semibold hover:bg-amber-600 hover:text-black'
        >
          <span>Crear Subrack</span>
          <span className='material-symbols-outlined mr-2'>add_circle</span>
        </Link>
      ) : (
        <Link
          to='../search'
          className='basis-1/2 uppercase flex justify-center items-center gap-3 bg-amber-400 py-2 px-3 rounded-lg font-semibold hover:bg-amber-600'
        >
          Ver Subracks
          <span className='material-symbols-outlined'>search</span>
        </Link>
      )}
    </div>
  )
}
