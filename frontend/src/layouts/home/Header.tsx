import { Link } from "react-router-dom"

export const Header = () => {
  return (
    <header className="bg-black text-white px-2 py-2 font-roboto flex gap-4">
      <Link to='/'><h1>DWDM Planner</h1></Link>
      <nav>
        <ul className="flex gap-3">
          <li className="flex gap-1">Catalogo<span className="material-symbols-outlined">arrow_drop_down</span></li>
          <Link to='central' className="flex gap-1">Centrales<span className="material-symbols-outlined">arrow_drop_down</span></Link>
        </ul>
      </nav>
    </header>
  )
}
