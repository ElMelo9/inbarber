import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { createHeaders } from '../../helpers/auth-helper';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { barrioResponse,barrioCreate,barrioUpdate } from '../../models/barrio.interface';

@Injectable({
  providedIn: 'root'
})
export class BarrioService {

  private apiUrl = environment.apiUrl + 'barrios';

  constructor(private http: HttpClient) { }

  getAll(): Observable<barrioResponse[]> {
    const headers = createHeaders();
    const url = this.apiUrl + '/getAll'
    return this.http.get<barrioResponse[]>(url, { headers })
  }

  create(barrio: barrioCreate): Observable<barrioResponse> {
    const headers = createHeaders();
    const url = this.apiUrl + '/insert'
    return this.http.post<barrioResponse>(url,barrio,{headers})
  }

  updateById(id: number, barrio: barrioUpdate): Observable<barrioResponse> {
    const headers = createHeaders();
    const url = this.apiUrl + '/update/' + id
    return this.http.put<barrioResponse>(url, barrio, { headers })
  }

  deleteById(id: number): Observable<boolean> {
    const headers = createHeaders();
    const url = this.apiUrl + '/delete/' + id
    return this.http.delete<boolean>(url, { headers })
  }
}
