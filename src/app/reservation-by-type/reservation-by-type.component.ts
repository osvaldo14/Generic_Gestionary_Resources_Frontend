import {Component, OnInit} from '@angular/core';
import {Reservation} from '../interface/Reservation';
import {ServerService} from '../server.service';

@Component({
  selector: 'app-reservation-by-type',
  templateUrl: './reservation-by-type.component.html',
  styleUrls: ['./reservation-by-type.component.css']
})
export class ReservationByTypeComponent implements OnInit {

  public data: any;
  type: any;
  reservations: Reservation[] = [];
  resourcesByType: string[] = [];

  constructor(private Server: ServerService) {
  }

  ngOnInit() {
    this.type = this.data.myType;
    this.Resources();
    this.get_reservation_from_db();
  }

  get_reservation_from_db() {
    this.Server.get_reservation_list().subscribe((data: Reservation[]) => {
      let res: Reservation = data[0];
      for (let i = 0; i < data.length; i++) {
        console.log(data[i].name);
        console.log(data[i].start);
        console.log(data[i].end);
        console.log(data[i].resourceList);

        res.name = data[i].name;
        res.start = new Date(data[i].start);
        res.end = new Date(data[i].end);
        res.resourceList = data[i].resourceList;
        this.reservations.push(res);
      }
    });
    console.log(this.reservations);
    this.reservations.filter(r => {
      for (let i = 0 ; i < r.resourceList.length; i++) {
        for (let j = 0 ; j < this.resourcesByType.length; j++) {
          if (r.resourceList[i] === this.resourcesByType[j]) { return true; }
        }
      }
      return false;
    });
    console.log(this.reservations);
  }

  Resources() {
    this.Server.get_resource_by_type().subscribe((data: string[]) => {
      for (let i = 0; i < data.length; i++) {
        this.resourcesByType.push(data[i]);
      }
    });
  }

}
