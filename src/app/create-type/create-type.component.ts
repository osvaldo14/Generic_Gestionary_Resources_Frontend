import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ServerService} from '../server.service';
import {ResourceType, caracteristics} from '../resource-type';
import {ChoiceCreationComponent} from '../choice-creation/choice-creation.component';
import {MatDialog} from '@angular/material';
import {CreateResourceComponent} from '../create-resource/create-resource.component';
import {SuccessfullCreationComponent} from '../successfull-creation/successfull-creation.component';

@Component({
  selector: 'app-create-type',
  templateUrl: './create-type.component.html',
  styleUrls: ['./create-type.component.css']
})
export class CreateTypeComponent implements OnInit {
  constructor(private _formBuilder: FormBuilder, private Server: ServerService) {
  }

  choices: string[] = [
    'String',
    'Numeric',
    'Boolean'
  ];
  typeForm: FormGroup;

  ngOnInit() {
    this.typeForm = this._formBuilder.group({
      name: [],
      typeCaracteristics: this._formBuilder.array([this._formBuilder.group({caracName: '', caracValue: ''})])
    });
  }

  get carac() {
    return this.typeForm.get('typeCaracteristics') as FormArray;
  }

  addCarac() {
    this.carac.push(this._formBuilder.group({caracName: '', caracValue: ''}));
  }

  deleteCarac(index) {
    this.carac.removeAt(index);
  }

  createType(type) {
    this.Server.create_resource_type(JSON.stringify(this.formatJson(type))).subscribe();
  }

  formatJson(type) {
    let res = {
      name: '',
      typeCaracteristics: {}
    };
    for (let i = 0; i < type.typeCaracteristics.length; i++) {
      const tmpName = type.typeCaracteristics[i].caracName;
      const tmpValue = type.typeCaracteristics[i].caracValue;
      const caracTemp: {[k: string]: any} = {[tmpName]: tmpValue}
      res.typeCaracteristics[tmpName] = tmpValue;
    }
    res.name = type.name;
    return res;
  }
}
