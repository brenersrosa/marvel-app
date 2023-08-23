import clsx from 'clsx'
import {
  InputHTMLAttributes,
  ForwardRefRenderFunction,
  forwardRef,
} from 'react'
import { FieldError } from 'react-hook-form'
import { HoverCard } from './HoverCard'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  prefix?: string
  message?: string
  error?: FieldError
  info?: boolean
  disabled?: boolean
  isInvalid?: boolean
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
          'focus-within:border-ignite-500 flex items-center rounded border-2 border-transparent bg-zinc-900 px-4 py-3',
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

        {info && <HoverCard message={message} error={error?.message} />}
      </div>
    </div>
  )
}

export const Input = forwardRef(InputBase)
