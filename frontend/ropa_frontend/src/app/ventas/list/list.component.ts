import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { VentaService, Venta } from '../venta.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    RouterModule
  ],
  template: `
    <h2>Ventas</h2>
    <div *ngIf="errorMessage" class="error">{{ errorMessage }}</div>
    <table mat-table [dataSource]="dataSource" class="mat-elevation-z8">
      <ng-container matColumnDef="region">
        <th mat-header-cell *matHeaderCellDef>Región</th>
        <td mat-cell *matCellDef="let venta">{{ venta.region }}</td>
      </ng-container>
      <ng-container matColumnDef="cantidad">
        <th mat-header-cell *matHeaderCellDef>Cantidad</th>
        <td mat-cell *matCellDef="let venta">{{ venta.cantidad }}</td>
      </ng-container>
      <ng-container matColumnDef="fecha">
        <th mat-header-cell *matHeaderCellDef>Fecha</th>
        <td mat-cell *matCellDef="let venta">{{ venta.fecha }}</td>
      </ng-container>
      <ng-container matColumnDef="estilo">
        <th mat-header-cell *matHeaderCellDef>Estilo</th>
        <td mat-cell *matCellDef="let venta">{{ venta.estilo }}</td>
      </ng-container>
      <ng-container matColumnDef="acciones">
        <th mat-header-cell *matHeaderCellDef>Acciones</th>
        <td mat-cell *matCellDef="let venta">
          <button mat-button [routerLink]="['/ventas/edit', venta.id]">Editar</button>
          <button mat-button [routerLink]="['/ventas/delete', venta.id]">Eliminar</button>
        </td>
      </ng-container>
      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
    </table>
    <button mat-raised-button routerLink="/ventas/create">Nueva Venta</button>
  `,
  styles: [`
    .mat-elevation-z8 { width: 100%; margin-top: 20px; }
    .error { color: red; margin-bottom: 10px; }
  `]
})
export class ListComponent implements OnInit, OnDestroy {
  dataSource = new MatTableDataSource<Venta>([]);
  displayedColumns: string[] = ['region', 'cantidad', 'fecha', 'estilo', 'acciones'];
  errorMessage: string | null = null;
  private routeSub: Subscription | null = null;

  constructor(
    private ventaService: VentaService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadVentas();

    this.routeSub = this.route.queryParams.subscribe(() => {
      this.loadVentas();
    });
  }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  loadVentas(): void {
    this.ventaService.getVentas().subscribe({
      next: (data) => {
        console.log('Ventas cargadas:', data);
        this.dataSource.data = data;
      },
      error: (err) => {
        this.errorMessage = 'Error al cargar las ventas: ' + err.message;
        console.error(err);
      }
    });
  }
}
