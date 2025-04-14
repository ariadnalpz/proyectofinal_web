import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { TelaService, Tela } from '../tela.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-delete-tela',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule
  ],
  template: `
    <h2>Eliminar Tela</h2>
    <p *ngIf="tela">¿Estás seguro de eliminar la tela de tipo "{{ tela.tipo }}"?</p>
    <button mat-raised-button color="warn" (click)="onDelete()">Eliminar</button>
    <button mat-button routerLink="/telas">Cancelar</button>
  `,
  styles: [``]
})
export class DeleteComponent implements OnInit {
  tela: Tela | null = null;

  constructor(
    private telaService: TelaService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = +idParam;
      this.telaService.getTelas().subscribe({
        next: (data) => {
          this.tela = data.find(t => t.id === id) || null;
          if (!this.tela) {
            this.router.navigate(['/telas']);
          }
        },
        error: (err) => {
          console.error('Error al cargar la tela:', err);
          this.router.navigate(['/telas']);
        }
      });
    } else {
      this.router.navigate(['/telas']);
    }
  }

  onDelete(): void {
    if (this.tela && this.tela.id) {
      this.telaService.deleteTela(this.tela.id).subscribe({
        next: () => {
          this.router.navigate(['/telas']);
        },
        error: (err) => {
          console.error('Error al eliminar la tela:', err);
        }
      });
    }
  }
}
