import { Component, OnInit, Input, OnChanges, Output, EventEmitter, OnDestroy } from '@angular/core';
import { GlobalService } from '../shared/service/global.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit, OnChanges, OnDestroy {
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }
  totalPages: number;
  subscription: Subscription
  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
  }

  @Output() currentPage = new EventEmitter<any>()


  constructor(private readonly global: GlobalService) { }

  ngOnInit(): void {
    this.subscription = this.global.paginateEventExecute.subscribe(() => {
      this.pageChanged(1)
    })
  }

  pageChanged(event) {
    this.currentPage.emit(event)
  }


}
