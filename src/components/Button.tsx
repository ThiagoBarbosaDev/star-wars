import React, { MouseEventHandler, ReactNode } from 'react'

type ButtonProps = {
  children: ReactNode | string
  className?: string | undefined
  dataValue: string
  name: string
  isSubmit: boolean
  onClick: MouseEventHandler<HTMLButtonElement>
}

function Button({ children, className, isSubmit, onClick, name, dataValue }: ButtonProps) {
  return (
    <button
      className={className}
      type={isSubmit ? 'submit' : 'button'}
      onClick={onClick}
      name={name}
      data-value={dataValue}
    >
      {children}
    </button>
  )
}

export default Button
