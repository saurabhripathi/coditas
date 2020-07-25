import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../shared/service/global.service';
import { debounceTime, switchMap, debounce, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-git-card',
  templateUrl: './git-card.component.html',
  styleUrls: ['./git-card.component.scss']
})
export class GitCardComponent implements OnInit {
  response: any =[]

  constructor(private readonly globalService:GlobalService) { }

  ngOnInit(): void {
    this.globalService.passingKeyWordFromHeaderToCard.pipe(debounceTime(500),distinctUntilChanged(),switchMap((value)=>{
      return this.globalService.getUsersList({q:value})
    })).subscribe((response)=>{
      this.response = response.items
    })
  }

}
