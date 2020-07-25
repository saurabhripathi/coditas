import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'



/** creating the  instance of service in AppModule */
@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(
    private readonly httpClient: HttpClient,
  
    ) {}

  /** function for post requests */
  post<R>(url: string, body: any, options = {}): Observable<R> {
    options = this.setHeader(url, options)
    return this.httpClient.post<R>(url, body, options).pipe(
      tap(),
      catchError(error => this.onErrorHandler(error))
    )
  }

  /** function for get requests */
  get<R>(url: string, options = {}): Observable<R> {
    //options = (url === UrlForCSRFToken.key.url+UrlForCSRFToken.key.endPoint) ? this.setHeader(url, options, false) : this.setHeader(url, options)
    options = this.setHeader(url, options)
    return this.httpClient.get<R>(url, options).pipe(
      tap(),
      catchError(error => this.onErrorHandler(error))
    )
  }

  /** setting header while API calls */
  setHeader(url: string, options: any): object {
    let obj = {}
    obj = {
      'Content-Type': 'application/json'
    }

    if (options.hasOwnProperty('headers')) {
      for (const x of Object.keys(options.headers)) {
        obj[x] = options.headers[x]
      }
    }
    options.headers = new HttpHeaders(obj)

    if (options.hasOwnProperty('params')) {
      options.params = this.setParam(options)
    }

    return options
  }
  
  /** setting params before api calls */
  setParam(options): object {
    const params = {}
    for (const x of Object.keys(options.params)) {
      params[x] = options.params[x]
    }
    return params
  }

  /** onError occur this function callss */
  onErrorHandler(error: any) {
    if (error.status !== 504) {
      if ('onLine' in navigator && !navigator.onLine) {
        error.error.message =
          'Internet connection not available. Please check your internet connection and try again!!'
      }
    
     
      return throwError(error)
    }
  }
}
