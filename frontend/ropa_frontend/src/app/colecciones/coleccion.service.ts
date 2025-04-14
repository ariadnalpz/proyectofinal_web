import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Coleccion {
  id?: number;
  nombre: string;
  temporada: string;
  tendencia: string;
  stock: number;
}

@Injectable({
  providedIn: 'root'
})
export class ColeccionService {
  private apiUrl = 'http://localhost/api/colecciones/'; 

  constructor(private http: HttpClient) {}

  getColecciones(): Observable<Coleccion[]> {
    const headers = new HttpHeaders({
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache'
    });
    return this.http.get<any>(this.apiUrl, { headers }).pipe(
      map(response => {
        if (response && response.results) {
          return response.results as Coleccion[];
        }
        return response as Coleccion[];
      })
    );
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