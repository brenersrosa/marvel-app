import clsx from 'clsx'
import {
  InputHTMLAttributes,
  ForwardRefRenderFunction,
  forwardRef,
} from 'react'
import { FieldError } from 'react-hook-form'
import { HoverCard } from './HoverCard'
import { X } from 'lucide-react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  prefix?: string
  message?: string
  error?: FieldError
  info?: boolean
  disabled?: boolean
  isInvalid?: boolean
  onClear?: () => void
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  {
    label,
    prefix,
    message,
    error = null,
    info = false,
    disabled = false,
    isInvalid = false,
    onClear,
    ...rest
  },
  ref,
) => {
  return (
    <div
      className={clsx('relative flex flex-col gap-2', {
        'cursor-not-allowed opacity-70': disabled === true,
      })}
    >
      {label && (
        <label className="text-sm leading-relaxed text-zinc-100">{label}</label>
      )}

      <div
        className={clsx(
          'flex items-center rounded border border-transparent border-zinc-700 bg-zinc-900 px-4 py-3 focus-within:border-red-600',
          {
            'focus-within:border-red-500': error?.message || isInvalid,
          },
        )}
      >
        <span className="text-sm text-zinc-400">{prefix}</span>
        <input
          type="text"
          className="w-full bg-transparent text-zinc-100 placeholder-zinc-500 focus:outline-none disabled:cursor-not-allowed"
          ref={ref}
          {...rest}
          disabled={!!disabled}
        />
        {onClear && (
          <button
            onClick={onClear}
            className="text-zinc-400 transition-colors hover:text-zinc-200"
          >
            <X className="h-4 w-4" />
          </button>
        )}

        {info && <HoverCard message={message} error={error?.message} />}
      </div>
    </div>
  )
}

export const Input = forwardRef(InputBase)
