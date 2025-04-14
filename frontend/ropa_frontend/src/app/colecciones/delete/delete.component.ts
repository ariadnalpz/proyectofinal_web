import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { ColeccionService, Coleccion } from '../coleccion.service';
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
    <h2>Eliminar Colección</h2>
    <p *ngIf="coleccion">¿Estás seguro de eliminar "{{ coleccion.nombre }}"?</p>
    <button mat-raised-button color="warn" (click)="onDelete()">Eliminar</button>
    <button mat-button routerLink="/colecciones">Cancelar</button>
  `,
  styles: [``]
})
export class DeleteComponent implements OnInit {
  coleccion: Coleccion | null = null;

  constructor(
    private coleccionService: ColeccionService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = +idParam;
      this.coleccionService.getColecciones().subscribe({
        next: (data) => {
          this.coleccion = data.find(c => c.id === id) || null;
          if (!this.coleccion) {
            this.router.navigate(['/colecciones']);
          }
        },
        error: (err) => {
          console.error('Error al cargar la colección:', err);
          this.router.navigate(['/colecciones']);
        }
      });
    } else {
      this.router.navigate(['/colecciones']);
    }
  }

  onDelete(): void {
    if (this.coleccion && this.coleccion.id) {
      this.coleccionService.deleteColeccion(this.coleccion.id).subscribe({
        next: () => {
          this.router.navigate(['/colecciones']);
        },
        error: (err) => {
          console.error('Error al eliminar la colección:', err);
        }
      });
    }
  }
}