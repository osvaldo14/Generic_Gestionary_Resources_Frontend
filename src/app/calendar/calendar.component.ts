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
import {MatSnackBar} from '@angular/material';


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

export interface MyEvent extends CalendarEvent {
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

  activeDayIsOpen: boolean = true;

  constructor(private modal: NgbModal, private Server: ServerService, private snackBar: MatSnackBar) {

  }

  ngOnInit() {
    this.create_resources_reservation_list();
    this.get_reservation_from_db();
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
    this.handleEvent('Dropped or resized', event as MyEvent);
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
        title: 'New event',
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
    this.Server.delete_reservation(eventToDelete.title).subscribe();
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  addEventFromServer(name, start, end, r: Array<string>): void {
    this.events = [
      ...this.events,
      {
        title: name,
        resources: r,
        start: startOfDay(new Date(start)),
        end: endOfDay(new Date(end)),
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

  create_reservation(r_name, r_resources, r_start, r_end) {
    if (r_resources != null) {
      const array = {
        name: r_name,
        resourceList: r_resources,
        start: r_start,
        end: r_end
      };
      const r = JSON.stringify(array);
      this.Server.create_reservation(r).subscribe();
    } else {
      this.openSnackBar('Vous ne pouvez pas créer de réservation sans ressources', 'Compris !');
    }
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
    this.Server.get_reservation_list().subscribe((data: Reservation[]) => {
      for (let i = 0; i < data.length; i++) {
        this.addEventFromServer(data[i].name, data[i].start, data[i].end, data[i].resourceList);
        console.log();
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
