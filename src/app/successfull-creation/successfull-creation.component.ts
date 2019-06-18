import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-successfull-creation',
  templateUrl: './successfull-creation.component.html',
  styleUrls: ['./successfull-creation.component.css']
})
export class SuccessfullCreationComponent implements OnInit {

  displayMessage: string = 'nothing';

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

}
