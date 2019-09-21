import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GalleryComponent } from './gallery/gallery.component';
import { HomeComponent } from './home/home.component';
import { UploadComponent } from './upload/upload.component';


const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'gallery', component: GalleryComponent, runGuardsAndResolvers: "always" },
  {path: 'upload', component: UploadComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
