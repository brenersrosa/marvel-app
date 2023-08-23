import { ComponentProps, ElementType } from 'react'

interface BoxProps extends ComponentProps<ElementType> {
  as?: ElementType
  className?: string
}

export function Box({
  as: Element = 'div',
  className,
  ...restProps
}: BoxProps) {
  return (
    <Element
      {...restProps}
      className={`flex flex-col gap-4 rounded border border-zinc-700 bg-zinc-800 p-6 ${className}`}
    />
  )
}
