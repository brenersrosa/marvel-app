import { ArrowDown, ArrowUp } from 'lucide-react'
import { useState } from 'react'

interface OrderByProps {
  onChange?: (value: 'ascending' | 'descending') => void
  onSortChange: (value: string) => void
}

export function OrderBy({ onChange, onSortChange }: OrderByProps) {
  const [orderBy, setOrderBy] = useState<'ascending' | 'descending'>(
    'ascending',
  )

  function handleValueChange() {
    const newValue = orderBy === 'ascending' ? 'descending' : 'ascending'
    setOrderBy(newValue)
    if (onChange) {
      onChange(newValue)
    }
    if (onSortChange) {
      onSortChange(newValue === 'ascending' ? 'name' : '-name')
    }
  }

  return (
    <button className="flex items-center gap-2" onClick={handleValueChange}>
      <span>Order by:</span>
      {orderBy === 'ascending' ? (
        <>
          <ArrowUp />A - Z
        </>
      ) : (
        <>
          <ArrowDown />Z - A
        </>
      )}
    </button>
  )
}
