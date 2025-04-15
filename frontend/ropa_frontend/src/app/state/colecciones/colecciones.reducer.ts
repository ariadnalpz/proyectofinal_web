// src/app/state/colecciones/colecciones.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { Coleccion } from '../../colecciones/coleccion.model';
import * as ColeccionesActions from './colecciones.actions';

export interface ColeccionesState {
  colecciones: Coleccion[];
  error: string | null;
}

export const initialState: ColeccionesState = {
  colecciones: [],
  error: null,
};

export const coleccionesReducer = createReducer(
  initialState,
  on(ColeccionesActions.loadColeccionesSuccess, (state, { colecciones }) => ({
    ...state,
    colecciones,
    error: null,
  })),
  on(ColeccionesActions.loadColeccionesFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(ColeccionesActions.createColeccionSuccess, (state, { coleccion }) => ({
    ...state,
    colecciones: [...state.colecciones, coleccion],
    error: null,
  })),
  on(ColeccionesActions.createColeccionFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(ColeccionesActions.updateColeccionSuccess, (state, { coleccion }) => ({
    ...state,
    colecciones: state.colecciones.map((item) =>
      item.id === coleccion.id ? coleccion : item
    ),
    error: null,
  })),
  on(ColeccionesActions.updateColeccionFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(ColeccionesActions.deleteColeccionSuccess, (state, { id }) => ({
    ...state,
    colecciones: state.colecciones.filter((item) => item.id !== id),
    error: null,
  })),
  on(ColeccionesActions.deleteColeccionFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);