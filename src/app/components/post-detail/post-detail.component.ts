import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PostService } from 'src/app/services/post.service';
import { Posts } from 'src/app/Interfaces/posts';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
})
export class PostDetailComponent implements OnInit {
  post?: Posts;
  loading = false;
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.getPost();
  }

  getPost(): void {
    this.loading = true;
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.postService.getPost(id).subscribe((posts) => {
      this.loading = false;
      this.post = posts;
    });
  }
  goBack(): void {
    this.location.back();
  }
}
