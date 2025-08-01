interface Props {
    isLoading: boolean;
    onClick: () => Promise<void>
}

export const BtnAddSubrack = ({ isLoading, onClick }: Props) => (
  <button
    type='button'
    className='bg-emerald-400 px-3 py-1 rounded-md uppercase flex items-center gap-1 text-sm h-fit'
    onClick={onClick}
    disabled={isLoading}
  >
    {isLoading ? (
      <>
        <span className='material-symbols-outlined animate-spin'>refresh</span>
        Agregando...
      </>
    ) : (
      <>
        <span className='material-symbols-outlined'>add_circle</span>
        Agregar Subrack
      </>
    )}
  </button>
)
