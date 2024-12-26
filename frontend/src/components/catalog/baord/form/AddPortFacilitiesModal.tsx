import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { BoardFormData, BoardPortsType, LogicalSignal } from '../../../../types'
import { TablePortFacilities } from '../logicalPorts/TablePortFacilities'
import { BtnLogicalPortsModal } from '../logicalPorts/BtnLogicalPortsModal'

interface Props {
  index: number
  close: Dispatch<SetStateAction<boolean>>
}

export interface ILogicalPort {
  id: string
  signal: LogicalSignal | ''
  name: string
  from: number
  to: number
}

const parseString = (key: string, input: string[]): ILogicalPort[] | [] => {
  const parseData: ILogicalPort[] = []
  const auxData: { [key: string]: Set<number> } = {}
  const sortedAuxData: { [key: string]: number[] } = {}

  input.forEach(value => {
    const lastColonIndex: number = value.lastIndexOf(':')
    const name: string = value.substring(0, lastColonIndex).trim()
    const number: number = parseInt(value.substring(lastColonIndex + 1).trim())

    if (!auxData[name]) {
      auxData[name] = new Set([number])
    } else {
      auxData[name].add(number)
    }
  })

  // Sort auxData
  Object.keys(auxData).forEach(key => {
    sortedAuxData[key] = Array.from(auxData[key]).sort((a, b) => a - b)
  })

  for (const data in sortedAuxData) {
    const auxNumber: { from: number; to: number } = { from: 1, to: 1 }
    for (let i = 0; i < sortedAuxData[data].length; i++) {
      if (i === 0) {
        auxNumber.from = sortedAuxData[data][i]
        auxNumber.to = sortedAuxData[data][i]
      } else if (sortedAuxData[data][i] - sortedAuxData[data][i - 1] === 1) {
        auxNumber.to = sortedAuxData[data][i]
      } else {
        parseData.push({
          id: generateId(),
          signal: key as LogicalSignal,
          name: data,
          from: auxNumber.from,
          to: auxNumber.to,
        })
        auxNumber.from = sortedAuxData[data][i]
        auxNumber.to = sortedAuxData[data][i]
      }
    }
    // Agregar el último rango
    parseData.push({
      id: generateId(),
      signal: key as LogicalSignal,
      name: data,
      from: auxNumber.from,
      to: auxNumber.to,
    })
  }

  return parseData
}

const generateId = (): string => {
  return 'id' + '-' + Math.random().toString(36).substring(2, 9)
}

export const AddPortFacilitiesModal = ({ close, index }: Props) => {
  const [logicalPorts, setLogicalPorts] = useState<ILogicalPort[]>([])
  const [lp, setLp] = useState<BoardFormData['ports'][number]['logicalFacilities']>({})
  const [error, setError] = useState<string | null>(null)

  const { control, setValue } = useFormContext()
  const { port, physical, NMS, fullName, logicalFacilities }: Partial<BoardPortsType> = useWatch({
    control,
    name: `ports.${index}`,
  })

  useEffect(() => {
    if (logicalFacilities) {
      setLp(logicalFacilities || {})
      const data: ILogicalPort[] = Object.entries(logicalFacilities)
        .filter(([key]) => Object.values(LogicalSignal).includes(key as LogicalSignal))
        .reduce((acc, [signal, values]) => {
          acc.push(...parseString(signal, values))
          return acc
        }, [] as ILogicalPort[])
      setLogicalPorts(data)
    }
  }, [logicalFacilities])

  const addLogicalPort = () => {
    setLogicalPorts(prev => [...prev, { id: generateId(), signal: '', name: fullName + '-', from: 1, to: 1 }])
  }

  const handleInputChange = (id: ILogicalPort['id'], key: keyof ILogicalPort, value: string | number) => {
    setLogicalPorts(prev => prev.map(logicalPort => (logicalPort.id === id ? { ...logicalPort, [key]: value } : logicalPort)))
  }

  const handleDeleteLP = (id: string) => {
    setLogicalPorts(prev => prev.filter(logicalPort => logicalPort.id !== id))
    setLp(prevLp => {
      const updatedLp = { ...prevLp }
      const deletedLogicalPort = logicalPorts.find(port => port.id === id)

      if (deletedLogicalPort && deletedLogicalPort.signal !== '') {
        updatedLp[deletedLogicalPort.signal] = updatedLp[deletedLogicalPort.signal]?.filter(item => !item.startsWith(deletedLogicalPort.name))

        if (updatedLp[deletedLogicalPort.signal]?.length === 0) {
          delete updatedLp[deletedLogicalPort.signal]
        }
      }
      return updatedLp
    })
  }

  const handleAddFacility = () => {
    const currentFacilities = { ...lp }

    for (const logicalPort of logicalPorts) {
      const { signal, name, from, to } = logicalPort
      if (signal && from > 0 && to >= from) {
        if (logicalPorts.some(port => port.name.toLocaleLowerCase() === name.toLowerCase() && port.id !== logicalPort.id)) {
          setError(`El nombre "${name}" ya está en uso. Name debe ser Unico`)
          return
        }
        const values: string[] = []
        for (let i = from; i <= to; i++) {
          values.push(`${name}:${i}`)
        }
        if (!currentFacilities[signal]) {
          currentFacilities[signal] = values
        } else {
          const uniqueValues = new Set([...currentFacilities[signal], ...values])
          currentFacilities[signal] = Array.from(uniqueValues)
        }
      }
    }
    setLp(currentFacilities)
    setValue(`ports.${index}.logicalFacilities`, currentFacilities)
    close(false)
  }

  return (
    <div className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center text-black z-50 font-roboto_condensed'>
      <div className='bg-white p-5 rounded-lg flex flex-col justify-center items-center gap-5'>
        <p className='text-base border-b-4 border-gray-500 pb-2 uppercase w-full text-center'>
          <strong>Port:</strong> {port} / <strong>Fisico:</strong> {physical} / <strong>NMS:</strong> {NMS} / <strong>Name:</strong> {fullName}
        </p>
        {error && <div className='bg-red-600 text-white uppercase px-3 py-1 rounded-md text-base'>{error}</div>}
        <TablePortFacilities handleDeleteLP={handleDeleteLP} handleInputChange={handleInputChange} logicalPorts={logicalPorts} />
        <BtnLogicalPortsModal addLogicalPort={addLogicalPort} close={close} handleAddFacility={handleAddFacility} />
      </div>
    </div>
  )
}
