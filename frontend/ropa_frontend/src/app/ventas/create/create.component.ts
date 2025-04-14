import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { VentaService, Venta } from '../venta.service';
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
    <h2>Nueva Venta</h2>
    <form (ngSubmit)="onSubmit()">
      <mat-form-field>
        <input matInput placeholder="Región" [(ngModel)]="venta.region" name="region" required>
      </mat-form-field>
      <mat-form-field>
        <input matInput placeholder="Cantidad" type="number" [(ngModel)]="venta.cantidad" name="cantidad" required>
      </mat-form-field>
      <mat-form-field>
        <input matInput placeholder="Fecha (YYYY-MM-DD)" [(ngModel)]="venta.fecha" name="fecha" required>
      </mat-form-field>
      <mat-form-field>
        <input matInput placeholder="Estilo" [(ngModel)]="venta.estilo" name="estilo" required>
      </mat-form-field>
      <button mat-raised-button color="primary" type="submit">Guardar</button>
      <button mat-button routerLink="/ventas">Cancelar</button>
    </form>
  `,
  styles: [`form { display: flex; flex-direction: column; gap: 10px; max-width: 400px; }`]
})
export class CreateComponent {
  venta: Venta = {
    region: '',
    cantidad: 0,
    fecha: '',
    estilo: ''
  };

  constructor(private ventaService: VentaService, private router: Router) {}

  onSubmit(): void {
    this.ventaService.createVenta(this.venta).subscribe({
      next: () => {
        this.router.navigate(['/ventas'], { queryParams: { refresh: Date.now() } });
      },
      error: (err) => {
        console.error('Error al crear la venta:', err);
      }
    });
  }
}
