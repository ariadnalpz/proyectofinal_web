import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { createColeccion } from '../../state';
import { Coleccion } from '../../colecciones/coleccion.model';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule,
  ],
  template: `
    <h2>Nueva Colección</h2>
    <form #coleccionForm="ngForm" (ngSubmit)="onSubmit()" novalidate>
      <mat-form-field>
        <input matInput placeholder="Nombre" [(ngModel)]="coleccion.nombre" name="nombre" required>
      </mat-form-field>
      <mat-form-field>
        <input matInput placeholder="Temporada" [(ngModel)]="coleccion.temporada" name="temporada" required>
      </mat-form-field>
      <mat-form-field>
        <input matInput placeholder="Tendencia" [(ngModel)]="coleccion.tendencia" name="tendencia" required>
      </mat-form-field>
      <mat-form-field>
        <input matInput placeholder="Stock" type="number" [(ngModel)]="coleccion.stock" name="stock" required>
      </mat-form-field>
      <button mat-raised-button color="primary" type="submit" [disabled]="isSubmitting || coleccionForm.invalid">
        Guardar
      </button>
      <button mat-button routerLink="/colecciones">Cancelar</button>
    </form>
  `,
  styles: [`form { display: flex; flex-direction: column; gap: 10px; max-width: 400px; }`],
})
export class CreateComponent {
  coleccion: Coleccion = { nombre: '', temporada: '', tendencia: '', stock: 0 };
  isSubmitting = false; 

  constructor(
    private store: Store,
    private router: Router
  ) {}

  onSubmit(): void {
    if (this.isSubmitting) return;

    this.isSubmitting = true; // Deshabilitar el botón
    this.store.dispatch(createColeccion({ coleccion: { ...this.coleccion } }));
    this.router.navigate(['/colecciones']).finally(() => {
      this.isSubmitting = false;
    });
  }
}