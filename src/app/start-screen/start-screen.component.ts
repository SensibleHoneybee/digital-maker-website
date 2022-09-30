import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.css']
})
export class StartScreenComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  startShopping() {
    this.router.navigate(['/start-shopping']);
  }

  startTill() {
    this.router.navigate(['/start-till']);
  }

  writeCode() {
    this.router.navigate(['/write-code']);
  }

}
