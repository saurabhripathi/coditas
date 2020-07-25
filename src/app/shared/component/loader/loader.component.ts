import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../service/global.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
   status : boolean = false
  constructor(private readonly globalService:GlobalService) { }

  ngOnInit(): void {
    this.globalService.toggleLoaderState$.subscribe((status)=>{
      this.status =status

    })
    
  }

}
