// src/app/state/colecciones/colecciones.actions.ts
import { createAction, props } from '@ngrx/store';
import { Coleccion } from '../../colecciones/coleccion.model';

export const loadColecciones = createAction('[Colecciones] Load Colecciones');
export const loadColeccionesSuccess = createAction(
  '[Colecciones] Load Colecciones Success',
  props<{ colecciones: Coleccion[] }>()
);
export const loadColeccionesFailure = createAction(
  '[Colecciones] Load Colecciones Failure',
  props<{ error: string }>()
);

export const createColeccion = createAction(
  '[Colecciones] Create Coleccion',
  props<{ coleccion: Coleccion }>()
);
export const createColeccionSuccess = createAction(
  '[Colecciones] Create Coleccion Success',
  props<{ coleccion: Coleccion }>()
);
export const createColeccionFailure = createAction(
  '[Colecciones] Create Coleccion Failure',
  props<{ error: string }>()
);

export const updateColeccion = createAction(
  '[Colecciones] Update Coleccion',
  props<{ id: number; coleccion: Coleccion }>()
);
export const updateColeccionSuccess = createAction(
  '[Colecciones] Update Coleccion Success',
  props<{ coleccion: Coleccion }>()
);
export const updateColeccionFailure = createAction(
  '[Colecciones] Update Coleccion Failure',
  props<{ error: string }>()
);

export const deleteColeccion = createAction(
  '[Colecciones] Delete Coleccion',
  props<{ id: number }>()
);
export const deleteColeccionSuccess = createAction(
  '[Colecciones] Delete Coleccion Success',
  props<{ id: number }>()
);
export const deleteColeccionFailure = createAction(
  '[Colecciones] Delete Coleccion Failure',
  props<{ error: string }>()
);