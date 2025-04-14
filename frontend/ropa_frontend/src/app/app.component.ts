import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    MatToolbarModule,
    MatButtonModule
  ],
  template: `
    <mat-toolbar color="primary">
      <span>Ropa App</span>
      <button mat-button routerLink="/colecciones">Colecciones</button>
      <button mat-button routerLink="/estilos">Estilos</button>
      <button mat-button routerLink="/telas">Telas</button>
      <button mat-button routerLink="/ventas">Ventas</button>
    </mat-toolbar>
    <main>
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    mat-toolbar {
      display: flex;
      gap: 10px;
    }
    main {
      padding: 20px;
    }
  `]
})
export class AppComponent {
  title = 'ropa-frontend';
}