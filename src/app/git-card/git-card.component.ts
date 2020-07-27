import { Component, OnInit, Output, EventEmitter, Input, OnChanges, DoCheck, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { GlobalService } from '../shared/service/global.service';
import { debounceTime, switchMap, debounce, distinctUntilChanged } from 'rxjs/operators';
import { NgxPaginationModule } from 'ngx-pagination'
import { Subject } from 'rxjs';


@Component({
  selector: 'app-git-card',
  templateUrl: './git-card.component.html',
  styleUrls: ['./git-card.component.scss']
})
export class GitCardComponent implements OnInit, OnChanges, AfterViewInit {
  ngAfterViewInit(): void {
    for (let x of Object.keys(this.expend)) {
      document.getElementById(x.toString()).textContent = "Details"
    }
  }

  expend: any = {}
  @Input() sortBy: string
  @Input() p: number = 1
  usersRepoList: any = []
  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    this.sortFn()
  }
  @Output() totalRecords = new EventEmitter<any>()
  response: any = []
  @Input() pageClicked: any

  constructor(private readonly globalService: GlobalService, private readonly cdrf: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.globalService.passingKeyWordFromHeaderToCard.pipe(debounceTime(600), distinctUntilChanged(), switchMap((value) => {
      return this.globalService.getUsersList({ q: value })
    })).subscribe((response) => {
      this.response = response.items
      this.globalService.paginateEventExecuteFn(true)


      this.totalRecords.emit({ totalRecords: response.items.length })
      setTimeout(() => {
        if (this.response.length > 0) {
          this.sortFn()
        }
      }, 100)

      this.cdrf.detectChanges()

    })
  }

  sortFn() {

    this.toChangePreviousState()


    if (this.sortBy === 'asc') {
      this.response.sort((a, b) => a.login.localeCompare(b.login))
    }
    if (this.sortBy === 'dec') {
      this.response.sort((a, b) => a.login.localeCompare(b.login)).reverse()
    }

  }

  clickOnDetails(event, x, i) {


    const content = document.getElementById(i).textContent.trim()

    if (content === "Details") {
      this.globalService.getRepositoryDetails(x.login).subscribe((response) => {
        this.usersRepoList = response
        if (this.usersRepoList.length > 0) {
          if (Object.keys(this.expend).length > 0) {

            for (let x of Object.keys(this.expend)) {
              if (x !== i) {
                this.expend[x] = false
              }
            }
          }

          this.expend[i] = true
          document.getElementById(i.toString()).textContent = "Collapse"
        }
      })
    }
    else {
      this.expend[i] = false
      document.getElementById(i.toString()).textContent = "Details"

    }

  }

  toChangePreviousState() {

    if (Object.keys(this.expend).length > 0) {
      for (let x of Object.keys(this.expend)) {
        this.expend[x] = false

      }
    }


  }
}