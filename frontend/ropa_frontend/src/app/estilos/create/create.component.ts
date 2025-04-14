import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { EstiloService, Estilo } from '../estilo.service';
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
    <h2>Nuevo Estilo</h2>
    <form (ngSubmit)="onSubmit()">
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
  styles: [`form { display: flex; flex-direction: column; gap: 10px; max-width: 400px; }`]
})
export class CreateComponent {
  estilo: Estilo = {
    nombre: '',
    color: '',
    talla: '',
    preferencia_cliente: ''
  };

  constructor(private estiloService: EstiloService, private router: Router) {}

  onSubmit(): void {
    this.estiloService.createEstilo(this.estilo).subscribe({
      next: () => {
        this.router.navigate(['/estilos'], { queryParams: { refresh: Date.now() } });
      },
      error: (err) => {
        console.error('Error al crear el estilo:', err);
      }
    });
  }
}
