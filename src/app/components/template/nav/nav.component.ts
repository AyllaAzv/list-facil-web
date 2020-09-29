import { NavigationEnd, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  public href: string = "";

  constructor(private router: Router) {
    router.events.subscribe((val: any) => {
      this.href = val.url;
    });
   }

  ngOnInit(): void {
    this.href = this.router.url;
  }

}
