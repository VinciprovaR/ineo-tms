import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-header',
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  isMenuOpen: boolean = false;
  title: string = 'Task Management System';
  window = window;
  /**
   * Toggles the visibility of the mobile menu
   */
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updateTitle(event.target.innerWidth);
  }

  updateTitle(width: number) {
    this.title = width < 370 ? 'TmS' : 'Task Management System';
  }
}
