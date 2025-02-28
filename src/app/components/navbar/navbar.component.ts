import { Component, OnInit } from '@angular/core';
import { IonicModule } from "@ionic/angular";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [
    IonicModule
  ],
  standalone: true
})
export class NavbarComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
