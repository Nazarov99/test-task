import { Component, OnInit } from '@angular/core';
import {Post} from "../../../core/interfaces/post";
import {PostsService} from "../../../core/services/posts.service";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  current_page: number;
  per_page: number;
  total: number;
  destroy$ = new Subject();
  filterParams = {
    page: 1,
    pageSize: 5,
    tag: '',
  };
  tags = [
    {name: 'Project', key: 'project', active: false},
    {name: 'Design', key: 'design', active: false},
    {name: 'Idea', key: 'idea', active: false},
    {name: 'Android', key: 'android', active: false},
    {name: 'Ios', key: 'ios', active: false}
  ];
  pages = [
    {pageSize: 5},
    {pageSize: 10},
    {pageSize: 15},
  ];
  posts: Post[];
  imageUrl = environment.imageUrl;

  constructor(private service: PostsService) { }

  ngOnInit(): void {
    this.getPost();
  }

  getPost() {
    this.service.getPosts(this.filterParams)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.posts = res.data;
        this.current_page = res.current_page;
        this.per_page = res.per_page;
        this.total = res.total;
      })
  }

  selectTag(index: number, key: string) {
    const activeTag = this.tags.find(item => item.active);
    if (activeTag) {
      activeTag.active = false;
    }
    this.tags[index].active = true;
    this.filterParams.tag = key;
    this.getPost();
  }

  selectPageSize(event: any) {
    this.filterParams.pageSize = event.target.value;
    this.getPost();
  }

  onTableDataChange(event: any){
    this.filterParams.page = event;
    this.getPost();
  }

}
