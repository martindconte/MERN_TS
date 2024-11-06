import { Dispatch } from 'react';
import { Link } from 'react-router-dom';
import tableStyles from './styles/table.module.css';

interface Props {
    path: string;
    id: string;
    setModalView?: Dispatch<React.SetStateAction<boolean>>;
    btnDelete?: boolean
    setIdSelected?: Dispatch<React.SetStateAction<string>>
    fnSelected: () => void;
    selectedData?: any[];
}

export const ButtonActions = ({ path, id, btnDelete, setModalView, setIdSelected, fnSelected, selectedData }: Props) => {

  const basePath = path.split('/').filter(segment => segment !== 'search').join('/');

  const handleSelected = ( id: string ) => {
    setModalView && setModalView( true )
    setIdSelected && setIdSelected( id )
  }

  return (
    <div className={tableStyles.actions}>
        <Link to={`${basePath}/details/${id}`}><span className={`material-symbols-outlined ${tableStyles.descriptionIcon}`}>description</span></Link>
        <Link to={ `${basePath}/edit/${id}` }><span className={`material-symbols-outlined ${tableStyles.editIcon}`}>edit</span></Link>
        {
          btnDelete && <button onClick={ () => handleSelected( id ) } ><span className={`material-symbols-outlined ${tableStyles.deleteIcon}`}>delete</span></button>
        }
        {
          selectedData && ( <button onClick={ fnSelected }><span className={`material-symbols-outlined ${tableStyles.selectIcon}`}>start</span></button> )
        }
    </div>
  )
}
