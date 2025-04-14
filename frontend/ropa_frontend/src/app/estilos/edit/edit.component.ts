import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { EstiloService, Estilo } from '../estilo.service';

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
    <h2>Editar Estilo</h2>
    <div *ngIf="errorMessage" class="error">{{ errorMessage }}</div>
    <form *ngIf="estilo" (ngSubmit)="onSubmit()">
      <mat-form-field>
        <input matInput placeholder="Nombre" [(ngModel)]="estilo.nombre" name="nombre" required>
      </mat-form-field>
      <mat-form-field>
        <input matInput placeholder="Color" [(ngModel)]="estilo.color" name="color" required>
      </mat-form-field>
      <mat-form-field>
        <input matInput placeholder="Talla" [(ngModel)]="estilo.talla" name="talla" required>
      </mat-form-field>
      <mat-form-field>
        <input matInput placeholder="Preferencia del Cliente" [(ngModel)]="estilo.preferencia_cliente" name="preferencia_cliente" required>
      </mat-form-field>
      <button mat-raised-button color="primary" type="submit">Guardar</button>
      <button mat-button routerLink="/estilos">Cancelar</button>
    </form>
  `,
  styles: [`form { display: flex; flex-direction: column; gap: 10px; max-width: 400px; } .error { color: red; }`]
})
export class EditComponent implements OnInit {
  estilo: Estilo | null = null;
  errorMessage: string | null = null;

  constructor(
    private estiloService: EstiloService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.estiloService.getEstilos().subscribe({
      next: (estilos) => {
        this.estilo = estilos.find(e => e.id === id) || null;
        if (!this.estilo) {
          this.errorMessage = 'Estilo no encontrado';
        }
      },
      error: (err) => {
        this.errorMessage = 'Error al cargar el estilo: ' + err.message;
        console.error(err);
      }
    });
  }

  onSubmit(): void {
    if (this.estilo && this.estilo.id) {
      this.estiloService.updateEstilo(this.estilo.id, this.estilo).subscribe({
        next: () => {
          this.router.navigate(['/estilos'], { queryParams: { refresh: Date.now() } });
        },
        error: (err) => {
          console.error('Error al actualizar el estilo:', err);
        }
      });
    }
  }
}
