import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Publication } from '../../models/publication';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AskService {

  basePath = `${environment.treatmentApi}`;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'})
  };
  
  constructor(private httpClient: HttpClient) { }

  getAllAsks(): Observable<any> {
    return this.httpClient.get<Publication[]>(this.basePath+'getTreatments');
  }

  getAllAsksByEmail(email: any): Observable<any> {
    return this.httpClient.get<Publication[]>(this.basePath+'getAll/' + email);
  }

}
