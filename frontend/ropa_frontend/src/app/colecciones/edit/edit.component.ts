import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { ColeccionService, Coleccion } from '../coleccion.service';

@Component({
  selector: 'app-edit',
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
    <h2>Editar Colección</h2>
    <div *ngIf="errorMessage" class="error">{{ errorMessage }}</div>
    <form *ngIf="coleccion" (ngSubmit)="onSubmit()">
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
  styles: [`form { display: flex; flex-direction: column; gap: 10px; max-width: 400px; } .error { color: red; }`]
})
export class EditComponent implements OnInit {
  coleccion: Coleccion | null = null;
  errorMessage: string | null = null;

  constructor(
    private coleccionService: ColeccionService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.coleccionService.getColecciones().subscribe({
      next: (colecciones) => {
        this.coleccion = colecciones.find(c => c.id === id) || null;
        if (!this.coleccion) {
          this.errorMessage = 'Colección no encontrada';
        }
      },
      error: (err) => {
        this.errorMessage = 'Error al cargar la colección: ' + err.message;
        console.error(err);
      }
    });
  }

  onSubmit(): void {
    if (this.coleccion && this.coleccion.id) {
      this.coleccionService.updateColeccion(this.coleccion.id, this.coleccion).subscribe({
        next: () => {
          this.router.navigate(['/colecciones'], { queryParams: { refresh: Date.now() } });
        },
        error: (err) => {
          console.error('Error al actualizar la colección:', err);
        }
      });
    }
  }
}