import { useState, useCallback, useMemo } from 'react';

// 🔍 Hook para filtrado y búsqueda reutilizable
export interface FilterOption<T> {
  value: T;
  label: string;
  count?: number;
}

export interface UseFilterOptions<T, U> {
  data: U[];
  filterOptions: FilterOption<T>[];
  defaultFilter: T;
  searchFields: (keyof U)[];
  filterFunction?: (item: U, filter: T) => boolean;
  searchFunction?: (item: U, searchTerm: string) => boolean;
}

export interface UseFilterReturn<T, U> {
  filteredData: U[];
  currentFilter: T;
  searchTerm: string;
  setFilter: (filter: T) => void;
  setSearchTerm: (term: string) => void;
  clearFilters: () => void;
  getFilterCount: (filter: T) => number;
  isFilterActive: (filter: T) => boolean;
  hasActiveFilters: boolean;
  totalItems: number;
  filteredItems: number;
}

export function useFilter<T, U>({
  data,
  filterOptions,
  defaultFilter,
  searchFields,
  filterFunction,
  searchFunction
}: UseFilterOptions<T, U>): UseFilterReturn<T, U> {
  const [currentFilter, setCurrentFilter] = useState<T>(defaultFilter);
  const [searchTerm, setSearchTerm] = useState('');

  // Función de filtrado por defecto
  const defaultFilterFunction = useCallback((item: U, filter: T): boolean => {
    // Implementación básica - puede ser sobrescrita
    return true;
  }, []);

  // Función de búsqueda por defecto
  const defaultSearchFunction = useCallback((item: U, term: string): boolean => {
    if (!term.trim()) return true;
    
    const searchLower = term.toLowerCase();
    
    return searchFields.some(field => {
      const value = item[field];
      if (typeof value === 'string') {
        return value.toLowerCase().includes(searchLower);
      }
      if (typeof value === 'number') {
        return value.toString().includes(searchLower);
      }
      return false;
    });
  }, [searchFields]);

  // Aplicar filtros y búsqueda
  const filteredData = useMemo(() => {
    let result = data;

    // Aplicar filtro
    if (filterFunction || defaultFilterFunction) {
      const filterFn = filterFunction || defaultFilterFunction;
      result = result.filter(item => filterFn(item, currentFilter));
    }

    // Aplicar búsqueda
    if (searchTerm.trim()) {
      const searchFn = searchFunction || defaultSearchFunction;
      result = result.filter(item => searchFn(item, searchTerm));
    }

    return result;
  }, [data, currentFilter, searchTerm, filterFunction, defaultFilterFunction, searchFunction, defaultSearchFunction]);

  // Establecer filtro
  const setFilter = useCallback((filter: T) => {
    setCurrentFilter(filter);
  }, []);

  // Establecer término de búsqueda
  const setSearchTermValue = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  // Limpiar filtros
  const clearFilters = useCallback(() => {
    setCurrentFilter(defaultFilter);
    setSearchTerm('');
  }, [defaultFilter]);

  // Obtener conteo de items por filtro
  const getFilterCount = useCallback((filter: T): number => {
    if (filterFunction || defaultFilterFunction) {
      const filterFn = filterFunction || defaultFilterFunction;
      return data.filter(item => filterFn(item, filter)).length;
    }
    return data.length;
  }, [data, filterFunction, defaultFilterFunction]);

  // Verificar si un filtro está activo
  const isFilterActive = useCallback((filter: T): boolean => {
    return currentFilter === filter;
  }, [currentFilter]);

  // Verificar si hay filtros activos
  const hasActiveFilters = useMemo(() => {
    return currentFilter !== defaultFilter || searchTerm.trim() !== '';
  }, [currentFilter, defaultFilter, searchTerm]);

  // Totales
  const totalItems = data.length;
  const filteredItems = filteredData.length;

  return {
    filteredData,
    currentFilter,
    searchTerm,
    setFilter,
    setSearchTerm: setSearchTermValue,
    clearFilters,
    getFilterCount,
    isFilterActive,
    hasActiveFilters,
    totalItems,
    filteredItems
  };
}
