import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs";
import { Post } from './Post';
import { Photo } from "./Photo";

@Injectable({
  providedIn: 'root'
})
export class DataServicesService {

  posts: Post[] = [];
  photos: Photo[] = [];
  sample: any[] = [];

  constructor(public http: HttpClient) { }

  getPosts() {
    this.http.get<Post[]>('https://jsonplaceholder.typicode.com/posts')
    .subscribe((data: Post[]) => this.posts = data);
  }

  getPhotos() {
    this.http.get<Photo[]>('https://jsonplaceholder.typicode.com/photos')
    .subscribe((data: Photo[]) => this.photos = data);
  }

  getPhotoById(id: number) {
    return this.http.get<Photo>('https://jsonplaceholder.typicode.com/photos/' + id);
  }

  addPost(post: any) {
    this.http.post<Post>('https://jsonplaceholder.typicode.com/posts', post)
    .subscribe((data: Post) => this.posts.push(data));
  }
}
