import {Component, OnInit} from '@angular/core';
import {CreateResourceComponent} from '../create-resource/create-resource.component';
import {CreateTypeComponent} from '../create-type/create-type.component';
import {MatDialog} from '@angular/material';


@Component({
  selector: 'app-choice-creation',
  templateUrl: './choice-creation.component.html',
  styleUrls: ['./choice-creation.component.css']
})
export class ChoiceCreationComponent implements OnInit {

  constructor(public dialog: MatDialog) {
  }

  ngOnInit() {
  }

  Resource() {
    const dialogRef = this.dialog.open(CreateResourceComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  Type() {
    const dialogRef = this.dialog.open(CreateTypeComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  closeMyself(): void {
    this.dialog.closeAll();
  }

}
