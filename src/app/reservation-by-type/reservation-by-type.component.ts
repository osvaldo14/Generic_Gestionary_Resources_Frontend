import {Component, OnInit} from '@angular/core';
import {Reservation} from '../interface/Reservation';
import {ServerService} from '../server.service';
import {Ressources} from '../interface/ressources';
import * as moment from 'moment';

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
      for (let i = 0; i < data.length; i++) {
        this.reservations.push(data[i]);
      }
      this.reservations = this.reservations.filter(r => {
      for (let i = 0 ; i < r.resourceList.length; i++) {
        if (this.resourcesByType.includes(r.resourceList[i])) {
          return true;
        }
      }
      return false;
      });
      console.log(this.reservations);
      this.updateTime();
    });
  }


  Resources() {
    this.Server.get_resource_by_type().subscribe((data: Ressources) => {
      for (const key in data) {
        if (key === this.type) {
          for (let i = 0; i < data[key].length; i++) {
            this.resourcesByType.push(data[key][i]);
          }
        }
      }
    });
  }

  updateTime() {
    for (let i = 0 ; i < this.reservations.length ; i++) {
      const updatedStartTime = (this.reservations[i].start as any);
      const updatedEndTime = (this.reservations[i].end as any);
      this.reservations[i].start = new Date(updatedStartTime);
      this.reservations[i].end = new Date(updatedEndTime);
    }
  }

}
