import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../shared/service/global.service';
import { debounceTime, switchMap, distinctUntilChanged, map } from 'rxjs/operators';
import { of, Subject } from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  search$ = new Subject<any>()
  subscription: any;


  constructor(private readonly globalService:GlobalService) { }

  ngOnInit(): void {
     
    
  }

  search(event:any){
    let seachKeyword = event.target.value.trim()
    
    if(seachKeyword!=='' && seachKeyword!== null){
      this.globalService.passingKeyWordFromHeaderToCardFn(seachKeyword)
    
    }
 
  }

}
