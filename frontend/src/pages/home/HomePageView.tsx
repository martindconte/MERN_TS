import { Link } from "react-router-dom"

export const HomePageView = () => {
  return (
    <main className="flex-1 text-white bg-stone-900 px-2 py-4 font-roboto">
      <h2 className="uppercase text-center text-4xl font-bold font-oswald">DWDM <span className="text-yellow-500">Planner</span></h2>

      <div className="flex items-center justify-center my-12">
        <Link to='/central' className="border-2 border-white px-2 py-4 rounded-lg">
          <h3 className="uppercase">Centrales</h3>
        </Link>
      </div>
    </main>
  )
}
