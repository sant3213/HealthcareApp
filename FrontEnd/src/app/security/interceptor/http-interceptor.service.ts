import { Injectable, NgModule } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    var token = localStorage.getItem('ACCESS_TOKEN');
    if (token) {
      const newReq = req.clone(
        {
          headers: req.headers.set('Authorization', 'Bearer ' + token)
        });

      return next.handle(newReq);
    }
    else {
      return next.handle(req);
    }
  }
  constructor() { }
}

@NgModule({
  providers:[
    { provide: HTTP_INTERCEPTORS,
    useClass: HttpInterceptorService,
    multi:true}
  ]
})
export class HttpInterceptorModule { }
