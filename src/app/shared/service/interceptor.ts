import { Injectable } from '@angular/core'
import { HttpEvent, HttpInterceptor, HttpResponse, HttpRequest, HttpHandler } from '@angular/common/http'
import { tap } from 'rxjs/operators'
import { GlobalService } from './global.service'

/** creating the instance of service  */
@Injectable({
  providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {
  /** URLS for which we need to exclude some universal condition */
  urlsToNotUse: string[]

  /** this method calls everytime before every request as interceptor */
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): import('rxjs').Observable<HttpEvent<any>> {
    
      this.globalService.toggleLoaderState(true)
      return next.handle(req).pipe(
        tap(
          (event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
              this.globalService.toggleLoaderState(false)
            }
          },
          (err: any) => {
            this.globalService.toggleLoaderState(false)
          }
        )
      )
    
  }

  constructor(private readonly globalService: GlobalService) {
   

  }

  
}
