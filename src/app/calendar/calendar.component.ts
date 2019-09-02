import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  OnInit, ElementRef
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import {Subject} from 'rxjs';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView
} from 'angular-calendar';
import {ServerService} from '../server.service';
import {Ressources} from '../interface/ressources';
import {FormControl} from '@angular/forms';
import {Reservation} from '../interface/Reservation';
import {forEach} from '@angular/router/src/utils/collection';
import {MatDialog, MatSnackBar} from '@angular/material';
import {isNull} from 'util';
import * as $ from 'jquery';
import {EventEmitterService} from '../event-emitter.service';
import {ReservationFormComponent} from '../reservation-form/reservation-form.component';

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

export interface Food {
  value: string;
  viewValue: string;
}

declare var $: any;


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

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})

export class CalendarComponent implements OnInit {
  @ViewChild('modalContent') modalContent: TemplateRef<any>;
  foods: Food[] = [];

  resourceList: string[] = [];

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;
  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({event}: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event as MyEvent);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({event}: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event as MyEvent);
      }
    }
  ];

  refresh: Subject<any> = new Subject();

  events: MyEvent[] = [];
  event: MyEvent;

  //events: MyEvent[] = this.Server.events;
  message: string;

  activeDayIsOpen: boolean = true;

  constructor(private modal: NgbModal, private Server: ServerService, private snackBar: MatSnackBar,
              private eventEmitterService: EventEmitterService, public dialog: MatDialog) {

  }

  ngOnInit() {
    this.create_resources_reservation_list();
    this.get_reservation_from_db();
    this.displayConflict();
    this.eventEmitterService.
      invokeCalendarReservationFunction.subscribe((name: string) => {
        console.log('test');
        // A changer pour un async await ! ----
        let cpt = 0;
        let r = false;
        let c = false;
        r = this.get_reservation_from_db();
        c = this.displayConflict();
        while ( !r && !c ) { cpt += 1; }
        // ------------------------------------
        this.openSnackBar('La réservation a bien été créee', 'OK !');
      });
  }

  dayClicked({date, events}: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
    }
  }

  eventTimesChanged({
                      event,
                      newStart,
                      newEnd,
                    }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map(iEvent => {
      if (iEvent === event) {
        event.start = newStart;
        event.end = newEnd;
        return event as MyEvent;
      }
      return iEvent;
    });
    const reservationUpdates = {
      reservationID: event.id,
      start :  new Date(newStart).getTime().toString(),
      end:  new Date(newEnd).getTime().toString(),
      name: 'not modified',
      resources: []
    };
    this.Server.modify_reservation(JSON.stringify(reservationUpdates)).subscribe();
    this.handleEvent('Dropped or resized', event as MyEvent);
    let c = false;
    let cpt = 0;
    c = this.displayConflict();
    while ( !c ) { cpt += 1; }
  }

  handleEvent(action: string, event: MyEvent): void {
    console.log(event.resources);
  }

  updateRessourcesSelected() {
    this.events.forEach(event => event.ressourcesFormControl.setValue(event.resources));
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        id: null,
        title: 'Nouvelle réservation',
        resources: null,
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors.blue,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true
        },
        ressourcesFormControl: new FormControl()
      }
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter(event => event !== eventToDelete);
    this.Server.delete_reservation(eventToDelete.id).subscribe();
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  addEventFromServer(name, start, end, r: Array<string>, id): void {
    this.events = [
      ...this.events,
      {
        id: id,
        title: name,
        resources: r,
        start: new Date(start),
        end: new Date(end),
        color: colors.blue,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true
        },
        ressourcesFormControl: new FormControl()
      }
    ];

    this.updateRessourcesSelected();
  }

  create_resources_reservation_list() {
    this.foods = [];
    this.resourceList = [];
    this.Server.get_resources_names().subscribe((data: Ressources[]) => {
      for (let i = 0; i < data.length; i++) {
        this.resourceList.push(String(data[i]));
      }
    });
  }

  get_reservation_from_db() {
    this.events = [];
    this.Server.get_reservation_list().subscribe((data: Reservation[]) => {
      for (let i = 0; i < data.length; i++) {
        this.addEventFromServer(data[i].name, data[i].start, data[i].end, data[i].resourceList, data[i].id);
      }
    });
    return true;
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  displayConflict() {
    this.Server.conflict().subscribe((data: string[]) => {
      if (isNull(data)) {
        console.log('pas de conflit !');
      } else {
        this.events.forEach((e: MyEvent) => {
          for (let i = 0; i < data.length; i++) {
            if (e.id.toString() === data[i]) {
              e.color = colors.red;
              delete data[i];
              break;
            }
          }
        });
      }
    });
    return true;
  }

  update_reservation(event, name, start, end, resources) {
    const reservationUpdates = {
      reservationID: event.id,
      start :  new Date(start).getTime().toString(),
      end:  new Date(end).getTime().toString(),
      name: name,
      resources: resources
    };
    this.Server.modify_reservation(JSON.stringify(reservationUpdates)).subscribe();
    let c = false;
    let cpt = 0;
    c = this.displayConflict();
    while ( !c ) { cpt += 1; }
    this.openSnackBar('La réservation a bien été modifiée', 'OK !');
  }

}




