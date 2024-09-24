import { Link } from 'react-router-dom';
import tableStyles from './styles/table.module.css';
// import { Central } from '../../../types';
import { UseMutationResult } from '@tanstack/react-query';
import { DeleteResponse } from './Table';
import { Dispatch } from 'react';

interface Props {
    path: string;
    id: string;
    setModalView?: Dispatch<React.SetStateAction<boolean>>;
    fnDelete?: UseMutationResult<DeleteResponse, Error, { centralId: string }, unknown>;
    setIdSelected?: Dispatch<React.SetStateAction<string>>
}

export const ButtonActions = ({ path, id, fnDelete, setModalView, setIdSelected }: Props) => {

  const basePath = path.split( '/' )[1]

  const handleSelected = ( id: string ) => {
    setModalView && setModalView( true )
    setIdSelected && setIdSelected( id )
  }

  return (
    <div className={tableStyles.actions}>
        <Link to={`/${basePath}/description/${id}`}><span className={`material-symbols-outlined ${tableStyles.descriptionIcon}`}>description</span></Link>
        <Link to={ `/${basePath}/edit/${id}` }><span className={`material-symbols-outlined ${tableStyles.editIcon}`}>edit</span></Link>
        {
          fnDelete && <button onClick={ () => handleSelected( id ) } ><span className={`material-symbols-outlined ${tableStyles.deleteIcon}`}>delete</span></button>
        }
    </div>
  )
}