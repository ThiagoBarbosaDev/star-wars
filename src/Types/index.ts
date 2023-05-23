export type ColumnOptions =
  | 'population'
  | 'diameter'
  | 'surface_water'
  | 'rotation_period'
  | 'orbital_period'

export type OperatorOptions = 'maior que' | 'menor que' | 'igual a'

export type SortOrder = {
  column: ColumnOptions
  sort: 'ASC' | 'DESC'
}

export type SortState = {
  order: SortOrder
}

export type NumericFilter = {
  column: ColumnOptions
  operator: OperatorOptions
  value: string
}

export type FilterContextType = {
  setSearchPlanetValue: React.Dispatch<React.SetStateAction<string>>
  setUsedFiltersData: React.Dispatch<React.SetStateAction<NumericFilter[]>>
  setFilterSortRadio: React.Dispatch<React.SetStateAction<SortState>>
  setSortData: React.Dispatch<React.SetStateAction<any | null>>
  sortData: SortState | null
  searchPlanetValue: string
  usedFiltersData: NumericFilter[]
  filterSortRadio: SortState
}

export interface IPlanets {
  name: string
  rotation_period: string
  orbital_period: string
  diameter: string
  climate: string
  gravity: string
  terrain: string
  surface_water: string
  population: string
  residents: string[]
  films: string[]
  created: string
  edited: string
  url: string
}
