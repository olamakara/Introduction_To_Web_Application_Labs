import { DataServicesService } from './../data-services.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-single-photo',
  templateUrl: './single-photo.component.html',
  styleUrls: ['./single-photo.component.css']
})
export class SinglePhotoComponent implements OnInit {

  photo: any;
  id?: any;

  constructor(
    public data: DataServicesService,
    public route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => this.id = params.get('id'));
    this.data.getPhotoById(this.id).subscribe(data => this.photo = data);
  }

}
