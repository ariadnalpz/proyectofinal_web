import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Estilo {
  id?: number;
  nombre: string;
  color: string;
  talla: string;
  preferencia_cliente: string;
}

@Injectable({
  providedIn: 'root'
})
export class EstiloService {
  private apiUrl = 'http://localhost/api/estilos/';

  constructor(private http: HttpClient) {}

  getEstilos(): Observable<Estilo[]> {
    const headers = new HttpHeaders({
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache'
    });
    return this.http.get<any>(this.apiUrl, { headers }).pipe(
      map(response => {
        if (response && response.results) {
          return response.results as Estilo[];
        }
        return response as Estilo[];
      })
    );
  }

  createEstilo(estilo: Estilo): Observable<Estilo> {
    return this.http.post<Estilo>(this.apiUrl, estilo);
  }

  updateEstilo(id: number, estilo: Estilo): Observable<Estilo> {
    return this.http.put<Estilo>(`${this.apiUrl}${id}/`, estilo);
  }

  deleteEstilo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}/`);
  }
}