import { Link } from 'react-router-dom';
import tableStyles from './styles/table.module.css';

interface Props {
    path: string
    id: string
}

export const ButtonActions = ({ path, id }: Props) => {

    const basePath = path.split( '/' )[1]

  return (
    <div className={tableStyles.actions}>
        <Link to={`/${basePath}/description/${id}`}><span className={`material-symbols-outlined ${tableStyles.descriptionIcon}`}>description</span></Link>
        <Link to={ `/${basePath}/edit/${id}` }><span className={`material-symbols-outlined ${tableStyles.editIcon}`}>edit</span></Link>
        <Link to={ `/${basePath}/delete/${id}` }><span className={`material-symbols-outlined ${tableStyles.deleteIcon}`}>delete</span></Link>
    </div>
  )
}
