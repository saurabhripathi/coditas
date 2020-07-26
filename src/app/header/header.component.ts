import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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
  statusDisabled: boolean;
  @Output() sortByName = new EventEmitter<any>()



  constructor(private readonly globalService:GlobalService) { }

  ngOnInit(): void {
    this.globalService.toggleLoaderState$.subscribe((status)=>{
      this.statusDisabled = status
    })
     
    
  }

  search(event:any){
    let seachKeyword = event.target.value.trim()
    
    if(seachKeyword!=='' && seachKeyword!== null){
      this.globalService.passingKeyWordFromHeaderToCardFn(seachKeyword)
    
    }
 
  }

  sort(event){
    this.sortByName.emit(event.target.value)

  }

}
