import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { AlbumService } from '../../services/album';
import { Photo } from '../../models/photo';

@Component({
  selector: 'app-album-photos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './album-photos.html',
  styleUrls: ['./album-photos.css'],
})
export class AlbumPhotosComponent implements OnInit {
  photos: Photo[] = [];
  loading = true;
  albumId!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private albumService: AlbumService
  ) {}

  ngOnInit(): void {
    this.albumId = Number(this.route.snapshot.paramMap.get('id'));
    this.albumService.getAlbumPhotos(this.albumId).subscribe({
      next: (data) => {
        this.photos = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  back(): void {
    this.router.navigate(['/albums', this.albumId]);
  }
}