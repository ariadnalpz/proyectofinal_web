import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Venta {
  id?: number;
  region: string;
  cantidad: number;
  fecha: string;
  estilo: string;
}

@Injectable({
  providedIn: 'root'
})
export class VentaService {
  private apiUrl = 'http://localhost/api/ventas/';

  constructor(private http: HttpClient) {}

  getVentas(): Observable<Venta[]> {
    const headers = new HttpHeaders({
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache'
    });
    return this.http.get<any>(this.apiUrl, { headers }).pipe(
      map(response => {
        if (response && response.results) {
          return response.results as Venta[];
        }
        return response as Venta[];
      })
    );
  }

  createVenta(venta: Venta): Observable<Venta> {
    return this.http.post<Venta>(this.apiUrl, venta);
  }

  updateVenta(id: number, venta: Venta): Observable<Venta> {
    return this.http.put<Venta>(`${this.apiUrl}${id}/`, venta);
  }

  deleteVenta(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}/`);
  }
}
