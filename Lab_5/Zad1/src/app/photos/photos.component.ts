import { Component, OnInit } from '@angular/core';
import { DataServicesService } from '../data-services.service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})

export class PhotosComponent implements OnInit {

  constructor(public data: DataServicesService) { }

  ngOnInit(): void {
    this.data.getPhotos();
  }

}
