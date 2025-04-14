import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { TelaService, Tela } from '../tela.service';
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
    <h2>Nueva Tela</h2>
    <form (ngSubmit)="onSubmit()">
      <mat-form-field>
        <input matInput placeholder="Tipo" [(ngModel)]="tela.tipo" name="tipo" required>
      </mat-form-field>
      <mat-form-field>
        <input matInput placeholder="Cantidad" type="number" [(ngModel)]="tela.cantidad" name="cantidad" required>
      </mat-form-field>
      <mat-form-field>
        <input matInput placeholder="Color" [(ngModel)]="tela.color" name="color" required>
      </mat-form-field>
      <button mat-raised-button color="primary" type="submit">Guardar</button>
      <button mat-button routerLink="/telas">Cancelar</button>
    </form>
  `,
  styles: [`form { display: flex; flex-direction: column; gap: 10px; max-width: 400px; }`]
})
export class CreateComponent {
  tela: Tela = {
    tipo: '',
    cantidad: 0,
    color: ''
  };

  constructor(private telaService: TelaService, private router: Router) {}

  onSubmit(): void {
    this.telaService.createTela(this.tela).subscribe({
      next: () => {
        this.router.navigate(['/telas'], { queryParams: { refresh: Date.now() } });
      },
      error: (err) => {
        console.error('Error al crear la tela:', err);
      }
    });
  }
}
