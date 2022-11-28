import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {PostComponent} from "./post/post.component";
import {NgbPaginationModule} from "@ng-bootstrap/ng-bootstrap";

export const POST_ROUTES: Routes = [
  {
    path: '',
    component: PostComponent
  }
];

@NgModule({
  declarations: [
    PostComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(POST_ROUTES),
    NgbPaginationModule,
  ]
})
export class PostModule { }
