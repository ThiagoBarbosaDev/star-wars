import React, { ChangeEvent } from 'react'

type ComboBoxProps = {
  value: string
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void
  data: string[]
  name: string
  className?: string | undefined
  dataTestId?: string | undefined
}

function ComboBox({ value, onChange, data, name, dataTestId, className }: ComboBoxProps) {
  return (
    <select
      className={className}
      name={name}
      value={value}
      onChange={onChange}
      data-testid={dataTestId}
    >
      {data.map((option) => (
        <option key={option}>{option}</option>
      ))}
    </select>
  )
}

export default ComboBox
