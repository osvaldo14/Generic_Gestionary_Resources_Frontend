import {Component, OnInit} from '@angular/core';
import {Ressources} from '../interface/ressources';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ServerService} from '../server.service';
import {MatSnackBar} from '@angular/material';
import {Food} from '../calendar/calendar.component';
import {FormControl} from '@angular/forms';

import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView
} from 'angular-calendar';
import {toNumbers} from '@angular/compiler-cli/src/diagnostics/typescript_version';
import {EventEmitterService} from '../event-emitter.service';

export interface MyEvent extends CalendarEvent {
  id: number;
  title: string;
  resources: string[];
  start: Date;
  end: Date;
  color: any;
  draggable: true;
  resizable: {
    beforeStart: true,
    afterEnd: true
  };
  ressourcesFormControl: FormControl;
}


const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})
export class ReservationFormComponent implements OnInit {
  foods: Food[] = [];

  resourceList: string[] = [];

  message: string;
  event: MyEvent = {
    id: 0,
  title: '',
  resources: [],
  start: new Date(0),
  end: new Date(0),
  color: colors.blue,
  draggable: true,
  resizable: {
    beforeStart: true,
    afterEnd: true
  },
  ressourcesFormControl: new FormControl()
  };

  constructor(private modal: NgbModal, private Server: ServerService, private snackBar: MatSnackBar,
              private eventEmitterService: EventEmitterService) {
  }

  ngOnInit() {
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  create_reservation(r_name, r_resources, r_start, r_end) {
    if (r_resources != null) {
      const array = {
        name: r_name,
        resourceList: r_resources,
        start: new Date(r_start).getTime().toString(),
        end: new Date(r_end).getTime().toString()
      };
      console.log(r_name);
      console.log(r_resources)
      console.log(r_start);
      console.log(r_end);
      const r = JSON.stringify(array);
      this.Server.create_reservation(r).subscribe();
    } else {
      this.openSnackBar('Vous ne pouvez pas créer de réservation sans ressources', 'Compris !');
    }

    this.event.title = r_name;
    this.event.resources = r_resources;
    this.event.start = new Date(r_start);
    this.event.end = new Date(r_end);
    this.Server.addEvent(this.event);
    this.eventEmitterService.onCreateReservationButtonClick();
    /*this.Server.events.push({
      id: 0,
      title: r_name,
      resources: r_resources,
      start: new Date(r_start),
      end: new Date(r_end),
      color: colors.blue,
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      ressourcesFormControl: new FormControl()
    });*/
  }

  create_resources_reservation_list() {
    this.foods = [];
    this.resourceList = [];
    this.Server.get_resources_names().subscribe((data: Ressources[]) => {
      for (let i = 0; i < data.length; i++) {
        this.resourceList.push(String(data[i]));
      }
    });
    this.Server.changeMessage('Hello from the reservation form');
  }

  newMessage() {
    this.Server.changeMessage('Hello from the reservation form');
  }

}
