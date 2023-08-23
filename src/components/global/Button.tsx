import clsx from 'clsx'
import {
  ButtonHTMLAttributes,
  ForwardRefRenderFunction,
  ReactNode,
  forwardRef,
} from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode
  title?: string
  variant?: 'primary' | 'secondary' | 'cancel'
  className?: string
  onClick?: () => void
}

const ButtonBase: ForwardRefRenderFunction<HTMLButtonElement, ButtonProps> = (
  { icon, title, variant = 'primary', className, onClick, ...rest },
  ref,
) => {
  return (
    <button
      className={clsx(
        `flex flex-1 items-center justify-center gap-2 rounded px-8 py-3 font-medium transition-colors disabled:cursor-not-allowed disabled:bg-zinc-500 ${className}`,
        {
          'bg-red-600 hover:bg-red-700': variant === 'primary',
          'border-2 border-red-600 bg-transparent text-red-600 hover:bg-red-600 hover:text-zinc-100':
            variant === 'secondary',
          'bg-transparent transition-all hover:text-red-500':
            variant === 'cancel',
        },
      )}
      onClick={onClick}
      ref={ref}
      {...rest}
    >
      {title}
      {icon}
    </button>
  )
}

export const Button = forwardRef(ButtonBase)
