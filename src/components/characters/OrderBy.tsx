import { ArrowDown, ArrowUp } from 'lucide-react'
import { useState } from 'react'

interface OrderByProps {
  onChange?: (value: 'ascending' | 'descending') => void
  onSortChange: (value: string) => void
  orderBy: 'name' | '-name'
}

export function OrderBy({ onChange, onSortChange, orderBy }: OrderByProps) {
  const [sortingOrder, setSortingOrder] = useState<'ascending' | 'descending'>(
    orderBy === 'name' ? 'ascending' : 'descending',
  )

  function handleValueChange() {
    const newValue = sortingOrder === 'ascending' ? 'descending' : 'ascending'
    setSortingOrder(newValue)
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
      {sortingOrder === 'ascending' ? (
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
