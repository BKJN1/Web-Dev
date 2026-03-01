import { ChangeDetectorRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AlbumService } from '../../services/album';
import { Album } from '../../models/album';

@Component({
  selector: 'app-album-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './album-detail.html',
})
export class AlbumDetailComponent implements OnInit {

  album?: Album;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private albumService: AlbumService,
    private cdr: ChangeDetectorRef
  ) {
    console.log('AlbumDetail constructor');
  }

  ngOnInit(): void {
    console.log('AlbumDetail ngOnInit');

    const idStr = this.route.snapshot.paramMap.get('id');
    const id = Number(idStr);
    console.log('Album id:', id, 'raw:', idStr);

    this.loading = true;

    this.albumService.getAlbum(id).subscribe({
      next: (data) => {
        console.log('ALBUM LOADED', data);
        this.album = data;
        this.loading = false;

        this.cdr.detectChanges(); // 👈 ВОТ ЭТО
      },
      error: (err) => {
        console.error('ALBUM ERROR', err);
        this.loading = false;
      }
    });
  }

  save(): void {
    if (!this.album) return;
    this.albumService.updateAlbum(this.album).subscribe({
      next: (data) => console.log('UPDATED', data),
      error: (err) => console.error('UPDATE ERROR', err)
    });
  }

  viewPhotos(): void {
    if (!this.album) return;
    this.router.navigate(['/albums', this.album.id, 'photos']);
  }

  back(): void {
    this.router.navigate(['/albums']);
  }
}