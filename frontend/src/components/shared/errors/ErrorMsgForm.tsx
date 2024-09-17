export const ErrorMsgForm = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="from-red-300 to-red-600 bg-gradient-to-br text-center py-1 rounded uppercase text-white font-bold text-xs my-1">
        { children }
    </div>
  )
}
