import { Component, OnInit } from '@angular/core';
import { Posts } from 'src/app/Interfaces/posts';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  posts: Posts[] = [];
  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.getPosts();
  }
  getPosts(): void {
    this.postService.getPosts().subscribe((posts) => (this.posts = posts));
  }
}
