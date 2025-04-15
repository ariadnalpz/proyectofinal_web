// src/app/colecciones/coleccion.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Coleccion } from './coleccion.model';

@Injectable({
  providedIn: 'root',
})
export class ColeccionService {
  private apiUrl = 'http://localhost/api/colecciones/';

  constructor(private http: HttpClient) {}

  getColecciones(): Observable<Coleccion[]> {
    return this.http.get<any>(this.apiUrl, {
      headers: new HttpHeaders({
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
      }),
    }).pipe(
      map((response) => {
        console.log('Respuesta del backend:', response);
        if (response && response.results) {
          return response.results as Coleccion[];
        }
        return response as Coleccion[];
      })
    );
  }

  getColeccionById(id: number): Observable<Coleccion> {
    return this.http.get<Coleccion>(`${this.apiUrl}${id}/`, {
      headers: new HttpHeaders({
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
      }),
    });
  }

  createColeccion(coleccion: Coleccion): Observable<Coleccion> {
    return this.http.post<Coleccion>(this.apiUrl, coleccion);
  }

  updateColeccion(id: number, coleccion: Coleccion): Observable<Coleccion> {
    return this.http.put<Coleccion>(`${this.apiUrl}${id}/`, coleccion);
  }

  deleteColeccion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}/`);
  }
}