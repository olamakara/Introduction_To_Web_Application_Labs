import { Component, OnInit } from '@angular/core';
import { DataServicesService } from '../data-services.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  constructor(public data: DataServicesService) { }

  ngOnInit(): void {
    this.data.getPosts();
  }

}
