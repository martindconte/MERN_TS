import { useState, Dispatch, SetStateAction } from 'react';
import styles from './styles/columnSelector.module.css'; // Asegúrate de crear un archivo CSS para los estilos

interface CheckboxSelectProps {
  columns: { key: string; label: string }[];
  selectedColumns: string[];
  setSelectedColumns: Dispatch<SetStateAction<string[]>>;
}

export const ColumnSelector = ({ columns, selectedColumns, setSelectedColumns }: CheckboxSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCheckboxChange = (key: string) => {
    setSelectedColumns((prevSelected) =>
      prevSelected.includes(key)
        ? prevSelected.filter((col) => col !== key)
        : [...prevSelected, key]
    );
  };

  return (
    <div className={styles.checkboxSelect}>
      <button onClick={() => setIsOpen(!isOpen)} className={styles.selectButton}>
        <p>Visualizar Datos</p><span className="material-symbols-outlined">arrow_drop_down</span>
      </button>
      {
        isOpen && (
          <div className={styles.options}>
            {
              columns.map(({ key, label }) => (
                <div key={key} className={styles.check}>
                  <input
                    className={ styles.checkbox }
                    type="checkbox"
                    id={key}
                    checked={selectedColumns.includes(key)}
                    onChange={() => handleCheckboxChange(key)}
                  />
                  <label htmlFor={key}>{label}</label>
                </div>
              ))
            }
          </div>
        )}
    </div>
  );
};