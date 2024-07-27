import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';

        if (error.error instanceof ErrorEvent) {
          // Client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // Server-side error
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }

        // Log the error (you can also show a notification or redirect the user)
        console.error(errorMessage);

        // Optionally, you could redirect the user to a login page if the error is 401 (unauthorized)
        if (error.status === 401) {
          // redirect to login
        }

        return throwError(() => new Error(errorMessage));
      })
    );
  }
}
