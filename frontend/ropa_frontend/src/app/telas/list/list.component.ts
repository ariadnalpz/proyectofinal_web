import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { TelaService, Tela } from '../tela.service';
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
    <h2>Telas</h2>
    <div *ngIf="errorMessage" class="error">{{ errorMessage }}</div>
    <table mat-table [dataSource]="dataSource" class="mat-elevation-z8">
      <ng-container matColumnDef="tipo">
        <th mat-header-cell *matHeaderCellDef>Tipo</th>
        <td mat-cell *matCellDef="let tela">{{ tela.tipo }}</td>
      </ng-container>
      <ng-container matColumnDef="cantidad">
        <th mat-header-cell *matHeaderCellDef>Cantidad</th>
        <td mat-cell *matCellDef="let tela">{{ tela.cantidad }}</td>
      </ng-container>
      <ng-container matColumnDef="color">
        <th mat-header-cell *matHeaderCellDef>Color</th>
        <td mat-cell *matCellDef="let tela">{{ tela.color }}</td>
      </ng-container>
      <ng-container matColumnDef="acciones">
        <th mat-header-cell *matHeaderCellDef>Acciones</th>
        <td mat-cell *matCellDef="let tela">
          <button mat-button [routerLink]="['/telas/edit', tela.id]">Editar</button>
          <button mat-button [routerLink]="['/telas/delete', tela.id]">Eliminar</button>
        </td>
      </ng-container>
      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
    </table>
    <button mat-raised-button routerLink="/telas/create">Nueva Tela</button>
  `,
  styles: [`
    .mat-elevation-z8 { width: 100%; margin-top: 20px; }
    .error { color: red; margin-bottom: 10px; }
  `]
})
export class ListComponent implements OnInit, OnDestroy {
  dataSource = new MatTableDataSource<Tela>([]);
  displayedColumns: string[] = ['tipo', 'cantidad', 'color', 'acciones'];
  errorMessage: string | null = null;
  private routeSub: Subscription | null = null;

  constructor(
    private telaService: TelaService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadTelas();

    this.routeSub = this.route.queryParams.subscribe(() => {
      this.loadTelas();
    });
  }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  loadTelas(): void {
    this.telaService.getTelas().subscribe({
      next: (data) => {
        console.log('Telas cargadas:', data);
        this.dataSource.data = data;
      },
      error: (err) => {
        this.errorMessage = 'Error al cargar las telas: ' + err.message;
        console.error(err);
      }
    });
  }
}
