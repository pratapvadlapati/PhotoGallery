import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { from } from 'rxjs';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  constructor(private _http: HttpClient,
              private _router: Router) { 
            
              }
          
             

 // delete image
   deleteImage(imageId){
    //console.log(imageId)
    /* let params = new HttpParams()
        .set('imageId', imageId) */
    this._http.get('http://localhost:3002/delete/' + imageId )
    .subscribe(res=>{
      //console.log(res)
       //this._router.
       //window.scrollTo(0, 0);
     
    })
   }


public gallery:any

  ngOnInit() {

    this._http.get('http://localhost:3002/images')
    .subscribe(data=>{
     this.gallery = data;

    })
  }

}

