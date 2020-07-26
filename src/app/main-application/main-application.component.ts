import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-main-application',
  templateUrl: './main-application.component.html',
  styleUrls: ['./main-application.component.scss']
})
export class MainApplicationComponent implements OnInit {
  sortBy: string = null
  totalRecords : number = null
  pageClicked:any
currentPage : number 
  constructor() { }

  ngOnInit(): void {
  }
  totalRecordsFn(event){
    this.totalRecords = event.totalRecords
  }
  pageClickedFn(event){
    this.pageClicked = event

  }

  currentPageFn(event){
    this.currentPage = event
  }

  sortByNameFn(event){
    this.sortBy =event
  }
  

}
