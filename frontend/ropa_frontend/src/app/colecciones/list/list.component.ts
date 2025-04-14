import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { ColeccionService, Coleccion } from '../coleccion.service';
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
    <h2>Colecciones</h2>
    <div *ngIf="errorMessage" class="error">{{ errorMessage }}</div>
    <table mat-table [dataSource]="dataSource" class="mat-elevation-z8">
      <ng-container matColumnDef="nombre">
        <th mat-header-cell *matHeaderCellDef>Nombre</th>
        <td mat-cell *matCellDef="let coleccion">{{ coleccion.nombre }}</td>
      </ng-container>
      <ng-container matColumnDef="temporada">
        <th mat-header-cell *matHeaderCellDef>Temporada</th>
        <td mat-cell *matCellDef="let coleccion">{{ coleccion.temporada }}</td>
      </ng-container>
      <ng-container matColumnDef="tendencia">
        <th mat-header-cell *matHeaderCellDef>Tendencia</th>
        <td mat-cell *matCellDef="let coleccion">{{ coleccion.tendencia }}</td>
      </ng-container>
      <ng-container matColumnDef="stock">
        <th mat-header-cell *matHeaderCellDef>Stock</th>
        <td mat-cell *matCellDef="let coleccion">{{ coleccion.stock }}</td>
      </ng-container>
      <ng-container matColumnDef="acciones">
        <th mat-header-cell *matHeaderCellDef>Acciones</th>
        <td mat-cell *matCellDef="let coleccion">
          <button mat-button [routerLink]="['/colecciones/edit', coleccion.id]">Editar</button>
          <button mat-button [routerLink]="['/colecciones/delete', coleccion.id]">Eliminar</button>
        </td>
      </ng-container>
      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
    </table>
    <button mat-raised-button routerLink="/colecciones/create">Nueva Colección</button>
  `,
  styles: [`
    .mat-elevation-z8 { width: 100%; margin-top: 20px; }
    .error { color: red; margin-bottom: 10px; }
  `]
})
export class ListComponent implements OnInit, OnDestroy {
  dataSource = new MatTableDataSource<Coleccion>([]);
  displayedColumns: string[] = ['nombre', 'temporada', 'tendencia', 'stock', 'acciones'];
  errorMessage: string | null = null;
  private routeSub: Subscription | null = null;

  constructor(
    private coleccionService: ColeccionService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadColecciones();

    this.routeSub = this.route.queryParams.subscribe(() => {
      this.loadColecciones();
    });
  }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  loadColecciones(): void {
    this.coleccionService.getColecciones().subscribe({
      next: (data) => {
        console.log('Colecciones cargadas:', data);
        this.dataSource.data = data;
      },
      error: (err) => {
        this.errorMessage = 'Error al cargar las colecciones: ' + err.message;
        console.error(err);
      }
    });
  }
}