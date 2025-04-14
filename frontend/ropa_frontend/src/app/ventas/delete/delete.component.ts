import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { VentaService, Venta } from '../venta.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-delete-venta',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule
  ],
  template: `
    <h2>Eliminar Venta</h2>
    <p *ngIf="venta">¿Estás seguro de eliminar la venta de la región "{{ venta.region }}"?</p>
    <button mat-raised-button color="warn" (click)="onDelete()">Eliminar</button>
    <button mat-button routerLink="/ventas">Cancelar</button>
  `,
  styles: [``]
})
export class DeleteComponent implements OnInit {
  venta: Venta | null = null;

  constructor(
    private ventaService: VentaService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = +idParam;
      this.ventaService.getVentas().subscribe({
        next: (data) => {
          this.venta = data.find(v => v.id === id) || null;
          if (!this.venta) {
            this.router.navigate(['/ventas']);
          }
        },
        error: (err) => {
          console.error('Error al cargar la venta:', err);
          this.router.navigate(['/ventas']);
        }
      });
    } else {
      this.router.navigate(['/ventas']);
    }
  }

  onDelete(): void {
    if (this.venta && this.venta.id) {
      this.ventaService.deleteVenta(this.venta.id).subscribe({
        next: () => {
          this.router.navigate(['/ventas']);
        },
        error: (err) => {
          console.error('Error al eliminar la venta:', err);
        }
      });
    }
  }
}
