import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { EstiloService, Estilo } from '../estilo.service';
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
    <h2>Estilos</h2>
    <div *ngIf="errorMessage" class="error">{{ errorMessage }}</div>
    <table mat-table [dataSource]="dataSource" class="mat-elevation-z8">
      <ng-container matColumnDef="nombre">
        <th mat-header-cell *matHeaderCellDef>Nombre</th>
        <td mat-cell *matCellDef="let estilo">{{ estilo.nombre }}</td>
      </ng-container>
      <ng-container matColumnDef="color">
        <th mat-header-cell *matHeaderCellDef>Color</th>
        <td mat-cell *matCellDef="let estilo">{{ estilo.color }}</td>
      </ng-container>
      <ng-container matColumnDef="talla">
        <th mat-header-cell *matHeaderCellDef>Talla</th>
        <td mat-cell *matCellDef="let estilo">{{ estilo.talla }}</td>
      </ng-container>
      <ng-container matColumnDef="preferencia_cliente">
        <th mat-header-cell *matHeaderCellDef>Preferencia Cliente</th>
        <td mat-cell *matCellDef="let estilo">{{ estilo.preferencia_cliente }}</td>
      </ng-container>
      <ng-container matColumnDef="acciones">
        <th mat-header-cell *matHeaderCellDef>Acciones</th>
        <td mat-cell *matCellDef="let estilo">
          <button mat-button [routerLink]="['/estilos/edit', estilo.id]">Editar</button>
          <button mat-button [routerLink]="['/estilos/delete', estilo.id]">Eliminar</button>
        </td>
      </ng-container>
      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
    </table>
    <button mat-raised-button routerLink="/estilos/create">Nuevo Estilo</button>
  `,
  styles: [`
    .mat-elevation-z8 { width: 100%; margin-top: 20px; }
    .error { color: red; margin-bottom: 10px; }
  `]
})
export class ListComponent implements OnInit, OnDestroy {
  dataSource = new MatTableDataSource<Estilo>([]);
  displayedColumns: string[] = ['nombre', 'color', 'talla', 'preferencia_cliente', 'acciones'];
  errorMessage: string | null = null;
  private routeSub: Subscription | null = null;

  constructor(
    private estiloService: EstiloService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadEstilos();

    this.routeSub = this.route.queryParams.subscribe(() => {
      this.loadEstilos();
    });
  }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  loadEstilos(): void {
    this.estiloService.getEstilos().subscribe({
      next: (data) => {
        console.log('Estilos cargados:', data);
        this.dataSource.data = data;
      },
      error: (err) => {
        this.errorMessage = 'Error al cargar los estilos: ' + err.message;
        console.error(err);
      }
    });
  }
}
