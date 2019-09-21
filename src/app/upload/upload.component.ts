import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { from } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

 
  form : FormGroup;

  constructor(private http: HttpClient,
              private _router: Router) { }

  selectedFile: File = null;
  FileUploadStatus:any;

  onSelected(event){
   // console.log(event);
    this.selectedFile = event.target.files[0]
  }

  onUpload(){
    let fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name)
    fd.append('caption', this.form.value.caption)
    //console.log(this.selectedFile);
    this.http.post('http://localhost:3002/upload', fd/* , {
      reportProgress: true,
      observe: 'events'
    } */)
    
    .subscribe(res =>{ 
      //if you want to track progress
      /* if(event.type == HttpEventType.UploadProgress){
        console.log('upload progress: '+  Math.round(event.loaded / event.total * 100) + '%')
      } */
      //console.log(res)
      this._router.navigate(['/gallery'])

    })
  }

  ngOnInit() {
    this.form = new FormGroup({
      caption: new FormControl('')
    })
    
  }

}
