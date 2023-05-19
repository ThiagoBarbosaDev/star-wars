import React, { ChangeEventHandler } from 'react'

interface InputProps {
  children?: string
  name: string
  type: string
  value: string
  checked?: boolean | undefined
  dataTestId?: string | undefined
  onChange: ChangeEventHandler<HTMLInputElement>
}

function Input({ children, type, name, value, checked, dataTestId, onChange }: InputProps) {
  return (
    <label htmlFor={`form-${name}`}>
      {children}
      <input
        name={name}
        id={`form-${name}`}
        type={type}
        value={value}
        checked={checked}
        data-testid={dataTestId}
        onChange={onChange}
      />
    </label>
  )
}

export default Input
