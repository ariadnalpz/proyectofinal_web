import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Tela {
  id?: number;
  tipo: string;
  cantidad: number;
  color: string;
}

@Injectable({
  providedIn: 'root'
})
export class TelaService {
  private apiUrl = 'http://localhost/api/telas/';

  constructor(private http: HttpClient) {}

  getTelas(): Observable<Tela[]> {
    const headers = new HttpHeaders({
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache'
    });
    return this.http.get<any>(this.apiUrl, { headers }).pipe(
      map(response => {
        if (response && response.results) {
          return response.results as Tela[];
        }
        return response as Tela[];
      })
    );
  }

  createTela(tela: Tela): Observable<Tela> {
    return this.http.post<Tela>(this.apiUrl, tela);
  }

  updateTela(id: number, tela: Tela): Observable<Tela> {
    return this.http.put<Tela>(`${this.apiUrl}${id}/`, tela);
  }

  deleteTela(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}/`);
  }
}