import { createContext } from 'react'
import { FilterContextType } from '../Types'

const FilterContext = createContext<FilterContextType | null>(null)

export default FilterContext
