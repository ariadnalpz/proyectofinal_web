import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { VentaService, Venta } from '../venta.service';

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
    <h2>Editar Venta</h2>
    <div *ngIf="errorMessage" class="error">{{ errorMessage }}</div>
    <form *ngIf="venta" (ngSubmit)="onSubmit()">
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
  styles: [`form { display: flex; flex-direction: column; gap: 10px; max-width: 400px; } .error { color: red; }`]
})
export class EditComponent implements OnInit {
  venta: Venta | null = null;
  errorMessage: string | null = null;

  constructor(
    private ventaService: VentaService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.ventaService.getVentas().subscribe({
      next: (ventas) => {
        this.venta = ventas.find(v => v.id === id) || null;
        if (!this.venta) {
          this.errorMessage = 'Venta no encontrada';
        }
      },
      error: (err) => {
        this.errorMessage = 'Error al cargar la venta: ' + err.message;
        console.error(err);
      }
    });
  }

  onSubmit(): void {
    if (this.venta && this.venta.id) {
      this.ventaService.updateVenta(this.venta.id, this.venta).subscribe({
        next: () => {
          this.router.navigate(['/ventas'], { queryParams: { refresh: Date.now() } });
        },
        error: (err) => {
          console.error('Error al actualizar la venta:', err);
        }
      });
    }
  }
}
