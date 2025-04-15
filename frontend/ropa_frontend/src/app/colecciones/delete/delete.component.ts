// src/app/colecciones/delete/delete.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { deleteColeccion } from '../../state';
import { ColeccionService } from '../coleccion.service';
import { Coleccion } from '../coleccion.model';

@Component({
  selector: 'app-delete',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule,
  ],
  template: `
    <h2>Eliminar Colección</h2>
    <div *ngIf="errorMessage" class="error">{{ errorMessage }}</div>
    <div *ngIf="coleccion">
      <p>¿Estás seguro de que deseas eliminar la colección "{{ coleccion!.nombre }}"?</p>
      <button mat-raised-button color="warn" (click)="onDelete()" [disabled]="isDeleting">
        Eliminar
      </button>
      <button mat-button routerLink="/colecciones">Cancelar</button>
    </div>
  `,
  styles: [`
    div { display: flex; flex-direction: column; gap: 10px; max-width: 400px; }
    .error { color: red; margin-bottom: 10px; }
  `],
})
export class DeleteComponent implements OnInit, OnDestroy {
  coleccion: Coleccion | null = null;
  errorMessage: string | null = null;
  isDeleting = false;
  private routeSub: Subscription | null = null;

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute,
    private coleccionService: ColeccionService
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe((params) => {
      const id = +params['id'];
      this.coleccionService.getColeccionById(id).subscribe({
        next: (coleccion) => {
          if (coleccion && coleccion.id !== undefined) {
            this.coleccion = { ...coleccion };
          } else {
            this.errorMessage = 'Colección no encontrada';
          }
        },
        error: (error) => {
          this.errorMessage = 'Error al cargar la colección: ' + error.message;
        }
      });
    });
  }

  onDelete(): void {
    if (this.isDeleting || !this.coleccion || this.coleccion.id === undefined) {
      this.errorMessage = 'No se puede eliminar: colección no válida';
      return;
    }

    this.isDeleting = true;
    this.store.dispatch(deleteColeccion({ id: this.coleccion.id }));
    this.router.navigate(['/colecciones']).finally(() => {
      this.isDeleting = false;
    });
  }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }
}