import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { EstiloService, Estilo } from '../estilo.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-delete',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule
  ],
  template: `
    <h2>Eliminar Estilo</h2>
    <p *ngIf="estilo">¿Estás seguro de eliminar "{{ estilo.nombre }}"?</p>
    <button mat-raised-button color="warn" (click)="onDelete()">Eliminar</button>
    <button mat-button routerLink="/estilos">Cancelar</button>
  `,
  styles: [``]
})
export class DeleteComponent implements OnInit {
  estilo: Estilo | null = null;

  constructor(
    private estiloService: EstiloService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = +idParam;
      this.estiloService.getEstilos().subscribe({
        next: (data) => {
          this.estilo = data.find(e => e.id === id) || null;
          if (!this.estilo) {
            this.router.navigate(['/estilos']);
          }
        },
        error: (err) => {
          console.error('Error al cargar el estilo:', err);
          this.router.navigate(['/estilos']);
        }
      });
    } else {
      this.router.navigate(['/estilos']);
    }
  }

  onDelete(): void {
    if (this.estilo && this.estilo.id) {
      this.estiloService.deleteEstilo(this.estilo.id).subscribe({
        next: () => {
          this.router.navigate(['/estilos']);
        },
        error: (err) => {
          console.error('Error al eliminar el estilo:', err);
        }
      });
    }
  }
}
