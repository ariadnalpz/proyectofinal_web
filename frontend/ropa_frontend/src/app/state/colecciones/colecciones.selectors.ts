import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ColeccionesState } from './colecciones.reducer';

export const selectColeccionesState = createFeatureSelector<ColeccionesState>('colecciones');

export const selectAllColecciones = createSelector(
  selectColeccionesState,
  (state) => state.colecciones
);

export const selectColeccionesError = createSelector(
  selectColeccionesState,
  (state) => state.error
);