import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { importProvidersFrom, isDevMode } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { routes } from './app/app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { coleccionesReducer } from './app/state/colecciones/colecciones.reducer';
import { ColeccionesEffects } from './app/state/colecciones/colecciones.effects';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    importProvidersFrom(MatToolbarModule, MatButtonModule),
    provideStore({ colecciones: coleccionesReducer }),
    provideEffects([ColeccionesEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
]
}).catch(err => console.error(err));