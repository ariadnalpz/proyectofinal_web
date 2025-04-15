import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { updateColeccion } from '../../state';
import { ColeccionService} from '../coleccion.service';
import { Coleccion } from '../../colecciones/coleccion.model';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule,
  ],
  template: `
    <h2>Editar Colección</h2>
    <div *ngIf="errorMessage" class="error">{{ errorMessage }}</div>
    <ng-container *ngIf="coleccion as col">
      <form #coleccionForm="ngForm" (ngSubmit)="onSubmit()" novalidate>
        <mat-form-field>
          <input matInput placeholder="Nombre" [(ngModel)]="col.nombre" name="nombre" required>
        </mat-form-field>
        <mat-form-field>
          <input matInput placeholder="Temporada" [(ngModel)]="col.temporada" name="temporada" required>
        </mat-form-field>
        <mat-form-field>
          <input matInput placeholder="Tendencia" [(ngModel)]="col.tendencia" name="tendencia" required>
        </mat-form-field>
        <mat-form-field>
          <input matInput placeholder="Stock" type="number" [(ngModel)]="col.stock" name="stock" required>
        </mat-form-field>
        <button mat-raised-button color="primary" type="submit" [disabled]="isSubmitting || coleccionForm.invalid">
          Actualizar
        </button>
        <button mat-button routerLink="/colecciones">Cancelar</button>
      </form>
    </ng-container>
  `,
  styles: [`
    form { display: flex; flex-direction: column; gap: 10px; max-width: 400px; }
    .error { color: red; margin-bottom: 10px; }
  `],
})
export class EditComponent implements OnInit, OnDestroy {
  coleccion: Coleccion | null = null;
  errorMessage: string | null = null;
  isSubmitting = false;
  private routeSub: Subscription | null = null;

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute,
    private coleccionService: ColeccionService
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe((params) => {
      const id = +params['id'];
      this.coleccionService.getColeccionById(id).subscribe({
        next: (coleccion) => {
          if (coleccion && coleccion.id !== undefined) {
            this.coleccion = { ...coleccion };
          } else {
            this.errorMessage = 'Colección no encontrada';
          }
        },
        error: (error) => {
          this.errorMessage = 'Error al cargar la colección: ' + error.message;
        }
      });
    });
  }

  onSubmit(): void {
    if (this.isSubmitting || !this.coleccion || this.coleccion.id === undefined) {
      this.errorMessage = 'No se puede actualizar: colección no válida';
      return;
    }

    this.isSubmitting = true;
    this.store.dispatch(updateColeccion({ id: this.coleccion.id, coleccion: { ...this.coleccion } }));
    this.router.navigate(['/colecciones']).finally(() => {
      this.isSubmitting = false;
    });
  }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }
}