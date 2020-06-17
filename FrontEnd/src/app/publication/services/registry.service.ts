import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Register } from '../models/register';

@Injectable({
  providedIn: 'root'
})
export class RegistryService {
  basePath = `${environment.treatmentApi}`;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'})
  };

  constructor(private httpClient: HttpClient) { }

  registerUser(registry: Register): Observable<any>{
    return this.httpClient.post<Register>(`${this.basePath}createTreatment`, registry, this.httpOptions);
  }

}