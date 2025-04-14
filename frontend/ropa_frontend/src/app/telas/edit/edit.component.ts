import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { TelaService, Tela } from '../tela.service';

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
    <h2>Editar Tela</h2>
    <div *ngIf="errorMessage" class="error">{{ errorMessage }}</div>
    <form *ngIf="tela" (ngSubmit)="onSubmit()">
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
  styles: [`form { display: flex; flex-direction: column; gap: 10px; max-width: 400px; } .error { color: red; }`]
})
export class EditComponent implements OnInit {
  tela: Tela | null = null;
  errorMessage: string | null = null;

  constructor(
    private telaService: TelaService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.telaService.getTelas().subscribe({
      next: (telas) => {
        this.tela = telas.find(t => t.id === id) || null;
        if (!this.tela) {
          this.errorMessage = 'Tela no encontrada';
        }
      },
      error: (err) => {
        this.errorMessage = 'Error al cargar la tela: ' + err.message;
        console.error(err);
      }
    });
  }

  onSubmit(): void {
    if (this.tela && this.tela.id) {
      this.telaService.updateTela(this.tela.id, this.tela).subscribe({
        next: () => {
          this.router.navigate(['/telas'], { queryParams: { refresh: Date.now() } });
        },
        error: (err) => {
          console.error('Error al actualizar la tela:', err);
        }
      });
    }
  }
}
