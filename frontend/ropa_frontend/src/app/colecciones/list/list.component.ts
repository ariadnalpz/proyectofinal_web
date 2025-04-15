import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Coleccion } from '../coleccion.model';
import { loadColecciones, selectAllColecciones, selectColeccionesError } from '../../state';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    RouterModule,
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
  `],
})
export class ListComponent implements OnInit, OnDestroy {
  dataSource = new MatTableDataSource<Coleccion>([]);
  displayedColumns: string[] = ['nombre', 'temporada', 'tendencia', 'stock', 'acciones'];
  errorMessage: string | null = null;
  private routeSub: Subscription | null = null;
  private storeSub: Subscription | null = null;

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    console.log('Disparando loadColecciones al inicio');
    this.store.dispatch(loadColecciones());

    this.storeSub = this.store.select(selectAllColecciones).subscribe({
      next: this.handleColeccionesLoaded.bind(this),
      error: (err) => {
        this.errorMessage = 'Error al cargar las colecciones: ' + err.message;
        console.error(err);
      },
    });

    this.store.select(selectColeccionesError).subscribe((error) => {
      this.errorMessage = error;
    });

    this.routeSub = this.route.queryParams
      .pipe(
        debounceTime(300),
        distinctUntilChanged((prev, curr) => prev['refresh'] === curr['refresh'])
      )
      .subscribe((params) => {
        if (params['refresh']) {
          console.log('Disparando loadColecciones por queryParams:', params);
          this.store.dispatch(loadColecciones());
        }
      });
  }

  private handleColeccionesLoaded(data: Coleccion[]): void {
    console.log('Colecciones cargadas:', data);
    console.log('cdr:', this.cdr);
    if (this.cdr) {
      this.cdr.detach();
      this.dataSource.data = data;
      this.cdr.reattach();
    } else {
      console.error('ChangeDetectorRef no está disponible');
      this.dataSource.data = data;
    }
  }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }
}