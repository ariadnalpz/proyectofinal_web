import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { ColeccionService, Coleccion } from '../coleccion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule
  ],
  template: `
    <h2>Nueva Colección</h2>
    <form (ngSubmit)="onSubmit()">
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
      <button mat-raised-button color="primary" type="submit">Guardar</button>
      <button mat-button routerLink="/colecciones">Cancelar</button>
    </form>
  `,
  styles: [`form { display: flex; flex-direction: column; gap: 10px; max-width: 400px; }`]
})
export class CreateComponent {
  coleccion: Coleccion = { nombre: '', temporada: '', tendencia: '', stock: 0 };

  constructor(private coleccionService: ColeccionService, private router: Router) {}

  onSubmit(): void {
    this.coleccionService.createColeccion(this.coleccion).subscribe({
      next: () => {
        this.router.navigate(['/colecciones'], { queryParams: { refresh: Date.now() } });
      },
      error: (err) => {
        console.error('Error al crear la colección:', err);
      }
    });
  }
}