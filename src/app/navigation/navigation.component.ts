import {Component, TemplateRef, ViewChild} from '@angular/core';
import { ServerService } from '../server.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  @ViewChild('modalContent') modalContent: TemplateRef<any>;
  str = 'ça ne marche pas...';
  constructor(private Server: ServerService, private modal: NgbModal) { }

}
