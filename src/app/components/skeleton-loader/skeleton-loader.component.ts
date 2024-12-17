import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-skeleton-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skeleton-loader.component.html',
})
export class SkeletonLoaderComponent implements OnInit {
  randomSkeletons: number = 0;

  ngOnInit(): void {
    this.randomSkeletons = Math.floor(Math.random() * 5) + 1;
  }
}
