import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit,OnChanges {
  totalPages: number;
  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
   
    
  }
 
  @Output() currentPage = new EventEmitter<any>()


  constructor() { }

  ngOnInit(): void {
  }


  pageChanged(event){
this.currentPage.emit(event)
  }


}
