import { Dispatch } from "react";
import { Table } from "@tanstack/react-table";
import styles from './styles/pagination.module.css';

interface Props<T> {
  table: Table<T>;
  limit: number;
  setLimit: Dispatch<React.SetStateAction<number>>;
  totalDocs: number;
  totalResults: number;
}

export const PaginationComponent = <T,>({ table, limit, setLimit, totalDocs, totalResults }: Props<T>) => {

  return (
    <div className={styles.paginationContainer}>
      <div className={styles.docs}>
        <p>Cantidad de Datos: <span>{totalResults}</span> de <span>{totalDocs}</span></p>
      </div>
      <div className={styles.page}>
        <button
          className={`${styles.btnPrev} ${table.getCanPreviousPage() ? '' : styles.btnDisable}`}
          onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          <p><span className="material-symbols-outlined">arrow_back</span> Prev</p>
        </button>
        <span>
          Página{' '}
          <strong>
            {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
          </strong>
        </span>
        <button
          className={`${styles.btnNext} ${table.getCanNextPage() ? '' : styles.btnDisable}`}
          onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          <p>Next<span className="material-symbols-outlined">arrow_forward</span></p>
        </button>
      </div>
      <div className={styles.selectLimit}>
        <p>Limite: </p>
        <select onChange={(e) => setLimit(Number(e.target.value))} value={limit}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>
    </div>
  );
};
