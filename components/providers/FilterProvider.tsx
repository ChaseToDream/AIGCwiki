'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface FilterState {
  searchQuery: string;
  sortBy: 'newest' | 'oldest';
  style: string | null;
  subject: string | null;
  model: string | null;
}

interface FilterContextValue extends FilterState {
  setSearchQuery: (q: string) => void;
  setSortBy: (s: 'newest' | 'oldest') => void;
  setStyle: (s: string | null) => void;
  setSubject: (s: string | null) => void;
  setModel: (m: string | null) => void;
  resetFilters: () => void;
  hasActiveFilters: boolean;
}

const defaultState: FilterState = {
  searchQuery: '',
  sortBy: 'newest',
  style: null,
  subject: null,
  model: null,
};

const FilterContext = createContext<FilterContextValue | null>(null);

export function FilterProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<FilterState>(defaultState);

  const setSearchQuery = useCallback((q: string) =>
    setState((prev) => ({ ...prev, searchQuery: q })), []);

  const setSortBy = useCallback((s: 'newest' | 'oldest') =>
    setState((prev) => ({ ...prev, sortBy: s })), []);

  const setStyle = useCallback((s: string | null) =>
    setState((prev) => ({ ...prev, style: s })), []);

  const setSubject = useCallback((s: string | null) =>
    setState((prev) => ({ ...prev, subject: s })), []);

  const setModel = useCallback((m: string | null) =>
    setState((prev) => ({ ...prev, model: m })), []);

  const resetFilters = useCallback(() =>
    setState(defaultState), []);

  const hasActiveFilters =
    state.searchQuery !== '' ||
    state.style !== null ||
    state.subject !== null ||
    state.model !== null;

  return (
    <FilterContext.Provider
      value={{
        ...state,
        setSearchQuery,
        setSortBy,
        setStyle,
        setSubject,
        setModel,
        resetFilters,
        hasActiveFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export function useFilter() {
  const ctx = useContext(FilterContext);
  if (!ctx) throw new Error('useFilter must be used within FilterProvider');
  return ctx;
}
