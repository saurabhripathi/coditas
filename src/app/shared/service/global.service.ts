import { Injectable } from '@angular/core';
import { of, BehaviorSubject, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RequestUrls } from '../requesturl';
import { HttpService } from './httpservice';




@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  public userList = new BehaviorSubject<any>({items:[]})
  public passingKeyWordFromHeaderToCard = new Subject<any>()
  public toggleLoaderState$ = new BehaviorSubject<boolean>(false)

  constructor(private readonly http:HttpService) { }

getUsersList(obj){
  console.log()
  return this.http.get<any>(RequestUrls.Urls.searchUrl.toString(),{params:obj})


}

passUserListFn(value){
  this.userList.next(value)

}
passingKeyWordFromHeaderToCardFn(kewWord){
  this.passingKeyWordFromHeaderToCard.next(kewWord)
}
toggleLoaderState(status){
  this.toggleLoaderState$.next(status)
}

getRepositoryDetails(user){
 return this.http.get<any>(RequestUrls.Urls.usersRep+user+'/repos')

}

}
