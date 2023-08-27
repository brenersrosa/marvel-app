import * as SwitchRadix from '@radix-ui/react-switch'
import {
  ForwardRefRenderFunction,
  InputHTMLAttributes,
  forwardRef,
} from 'react'

interface SwitchProps extends InputHTMLAttributes<HTMLInputElement> {
  isActive: 'active' | 'inactive'
  onIsActiveChange: (isActive: 'active' | 'inactive') => void
}

const SwitchBase: ForwardRefRenderFunction<HTMLInputElement, SwitchProps> = (
  { isActive, onIsActiveChange, ...rest },
  ref,
) => {
  function handleChangeStatus() {
    const newStatus = isActive === 'active' ? 'inactive' : 'active'
    onIsActiveChange(newStatus)
  }

  return (
    <div className="flex items-center gap-4">
      <label className="text-zinc-200" htmlFor="status-mode">
        Only favorites
      </label>
      <SwitchRadix.Root
        className="flex h-6 w-12 items-center rounded-full border border-zinc-700 bg-zinc-900"
        id="status-mode"
        checked={isActive === 'active'}
        onCheckedChange={handleChangeStatus}
      >
        <SwitchRadix.Thumb
          ref={ref}
          {...rest}
          className="block h-[23px] w-[23px] translate-x-[1px] rounded-full bg-red-600 transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-full data-[state=checked]:bg-green-500"
        />
      </SwitchRadix.Root>
    </div>
  )
}

export const Switch = forwardRef(SwitchBase)
