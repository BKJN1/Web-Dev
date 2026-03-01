import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { AlbumService } from '../../services/album';
import { Album } from '../../models/album';

@Component({
  selector: 'app-albums',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './albums.html',
})
export class AlbumsComponent implements OnInit {

  albums: Album[] = [];
  loading = true;

  constructor(
    private albumService: AlbumService,
    private router: Router
  ) {
    console.log('AlbumsComponent constructor');
  }

  ngOnInit(): void {
    console.log('AlbumsComponent ngOnInit');
    this.loadAlbums();
  }

  loadAlbums(): void {
    console.log('loadAlbums called');

    this.loading = true;

    this.albumService.getAlbums().subscribe({
      next: (data) => {
        console.log('ALBUMS LOADED', data.length);
        this.albums = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('ALBUMS ERROR', err);
        this.loading = false;
      }
    });
  }

  openAlbum(id: number) {
    this.router.navigate(['/albums', id]);
  }

  deleteAlbum(id: number) {
  const prev = this.albums;
  this.albums = this.albums.filter(a => a.id !== id);

  this.albumService.deleteAlbum(id).subscribe({
    error: (err) => {
      console.error(err);
      this.albums = prev;
    }
  });
}
}