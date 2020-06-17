import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Comments } from '../../models/comments';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CommentService {
  basePath = `${environment.treatmentApi}`;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'})
  };
  constructor(private httpClient: HttpClient) { }

  setComment(comment: Comments): Observable<any>{
    return this.httpClient.post<Comments[]>(`${this.basePath}setComment`, comment, this.httpOptions);
  }
}