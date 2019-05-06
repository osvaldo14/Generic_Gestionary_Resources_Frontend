import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  str = 'ça ne marche pas...';
  constructor(private Server: ServerService) { }

  ngOnInit() {
    this.str = this.Server.get_reservation()['1'];
    console.log(this.str['1']);
  }

}
