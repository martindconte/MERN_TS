import { Dispatch } from 'react';
import { Link, useLocation } from 'react-router-dom';
import tableStyles from './styles/table.module.css';

interface Props {
    path?: string;
    id: string;
    setModalView?: Dispatch<React.SetStateAction<boolean>>;
    btnDelete?: boolean
    setIdSelected?: Dispatch<React.SetStateAction<string>>
    fnSelected: () => void;
    selectedData?: any[];
}

export const ButtonActions = ({ path, id, btnDelete, setModalView, setIdSelected, fnSelected, selectedData }: Props) => {

  const { pathname } = useLocation();

  // Si no se pasa 'path', toma la ubicación actual (useLocation())
  // const basePath = path ? path.split('/').filter(segment => segment !== 'search').join('/') : window.location.pathname.split('/').filter(segment => segment !== 'search').join('/');

  const basePath = ( path || window.location.pathname )
  .split('/')
  .filter(segment => segment && segment !== 'search')
  .join('/');

  // Lógica para navegar
  const handleNavigate = ( subpath: string ) => {
    const targetPath = `/${basePath}/${subpath}/${id}`;
    return pathname.includes('deleted') ? `${targetPath}?isDeleted=true` : targetPath;
  };

  //* antes de agregar ?isDeleted=true
  // const handleNavigate = (subpath: string) => `/${basePath}/${subpath}/${id}`;
  // const handleNavigate = (subpath: string) => {
  //     navigate(`/${basePath}/${subpath}/${id}`);
  // };


  // const handleNavigate = (subpath: string) => {
  //   if (path) {
  //     console.log('path fue definido...');
  //     // Si path está definido, navega con basePath como ruta base
  //     console.log((`/${basePath}/${subpath}/${id}`));
  //     navigate(`/${basePath}/${subpath}/${id}`);
  //   } else {
  //     console.log('path NO fue definido...');
  //     console.log((`/${basePath}/${subpath}/${id}`));
  //     console.log(window.location);
  //     // Si path no está definido, navega con ruta relativa
  //     navigate(`/${basePath}/${subpath}/${id}`);
  //   }
  // };

  const handleSelected = ( id: string ) => {
    setModalView && setModalView( true )
    setIdSelected && setIdSelected( id )
  }

  return (
    <div className={tableStyles.actions}>
        {/* <Link to={`${basePath}/details/${id}`}><span className={`material-symbols-outlined ${tableStyles.descriptionIcon}`}>description</span></Link> */}
        <Link to={ handleNavigate('details') } ><span className={`material-symbols-outlined ${tableStyles.descriptionIcon}`}>description</span></Link>
        {/* <button onClick={() => handleNavigate('details')} ><span className={`material-symbols-outlined ${tableStyles.descriptionIcon}`}>description</span></button> */}
        {/* <button onClick={() => handleNavigate('edit')} ><span className={`material-symbols-outlined ${tableStyles.editIcon}`}>edit</span></button> */}
        <Link to={ handleNavigate('edit') }><span className={`material-symbols-outlined ${tableStyles.editIcon}`}>edit</span></Link>
        {
          btnDelete && <button onClick={ () => handleSelected( id ) } ><span className={`material-symbols-outlined ${tableStyles.deleteIcon}`}>delete</span></button>
        }
        {
          selectedData && ( <button onClick={ fnSelected }><span className={`material-symbols-outlined ${tableStyles.selectIcon}`}>start</span></button> )
        }
    </div>
  )
}
