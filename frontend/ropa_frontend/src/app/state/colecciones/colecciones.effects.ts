// src/app/state/colecciones/colecciones.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import * as ColeccionesActions from './colecciones.actions';
import { ColeccionService } from '../../colecciones/coleccion.service';

@Injectable()
export class ColeccionesEffects {
  private isFetching = false;
  private isCreating = false;
  private isUpdating = false; 
  private isDeleting = false; 

  loadColecciones$ = createEffect((): Observable<Action> => {
    return new Observable<Action>((observer) => {
      this.actions$.pipe(ofType(ColeccionesActions.loadColecciones)).subscribe(() => {
        if (this.isFetching) {
          observer.complete();
          return;
        }

        this.isFetching = true;
        console.log('Ejecutando getColecciones');
        this.coleccionService.getColecciones().subscribe({
          next: (colecciones) => {
            console.log('Datos recibidos:', colecciones);
            this.isFetching = false;
            observer.next(ColeccionesActions.loadColeccionesSuccess({ colecciones }));
            observer.complete();
          },
          error: (error) => {
            console.error('Error al cargar colecciones:', error);
            this.isFetching = false;
            observer.next(ColeccionesActions.loadColeccionesFailure({ error: error.message }));
            observer.complete();
          },
        });
      });
    });
  });

  createColeccion$ = createEffect((): Observable<Action> => {
    return new Observable<Action>((observer) => {
      this.actions$.pipe(ofType(ColeccionesActions.createColeccion)).subscribe(({ coleccion }) => {
        if (this.isCreating) {
          observer.complete();
          return;
        }

        this.isCreating = true;
        this.coleccionService.createColeccion(coleccion).subscribe({
          next: (newColeccion) => {
            this.isCreating = false;
            observer.next(ColeccionesActions.createColeccionSuccess({ coleccion: newColeccion }));
            observer.complete();
          },
          error: (error) => {
            this.isCreating = false;
            observer.next(ColeccionesActions.createColeccionFailure({ error: error.message }));
            observer.complete();
          },
        });
      });
    });
  });

  updateColeccion$ = createEffect((): Observable<Action> => {
    return new Observable<Action>((observer) => {
      this.actions$.pipe(ofType(ColeccionesActions.updateColeccion)).subscribe(({ id, coleccion }) => {
        if (this.isUpdating) {
          observer.complete();
          return;
        }

        this.isUpdating = true;
        this.coleccionService.updateColeccion(id, coleccion).subscribe({
          next: (updatedColeccion) => {
            this.isUpdating = false;
            observer.next(ColeccionesActions.updateColeccionSuccess({ coleccion: updatedColeccion }));
            observer.complete();
          },
          error: (error) => {
            this.isUpdating = false;
            observer.next(ColeccionesActions.updateColeccionFailure({ error: error.message }));
            observer.complete();
          },
        });
      });
    });
  });

  deleteColeccion$ = createEffect((): Observable<Action> => {
    return new Observable<Action>((observer) => {
      this.actions$.pipe(ofType(ColeccionesActions.deleteColeccion)).subscribe(({ id }) => {
        if (this.isDeleting) {
          observer.complete();
          return;
        }

        this.isDeleting = true;
        this.coleccionService.deleteColeccion(id).subscribe({
          next: () => {
            this.isDeleting = false;
            observer.next(ColeccionesActions.deleteColeccionSuccess({ id }));
            observer.complete();
          },
          error: (error) => {
            this.isDeleting = false;
            observer.next(ColeccionesActions.deleteColeccionFailure({ error: error.message }));
            observer.complete();
          },
        });
      });
    });
  });

  constructor(
    private actions$: Actions,
    private coleccionService: ColeccionService
  ) {
    console.log('Actions:', this.actions$);
  }
}