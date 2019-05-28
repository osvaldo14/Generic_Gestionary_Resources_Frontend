import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ServerService} from '../server.service';
import {Reservation} from '../interface/Reservation';
import {ResourceType} from '../interface/ResourceType';
import {CreateTypeComponent} from '../create-type/create-type.component';

@Component({
  selector: 'app-create-resource',
  templateUrl: './create-resource.component.html',
  styleUrls: ['./create-resource.component.css'],
})
export class CreateResourceComponent implements OnInit {
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  types: ResourceType[] = [];
  keysNames: string[] = [];

  constructor(private _formBuilder: FormBuilder, private Server: ServerService/*, private creaType: CreateTypeComponent*/) {
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

    /*---------------------NEW------------------------ */
    this.thirdFormGroup = this._formBuilder.group({
      typeCaracteristics: this._formBuilder.array([this._formBuilder.group({caracValue: ''})])
    });
    /*---------------------NEW------------------------ */


    this.Server.get_resource_types().subscribe((data: ResourceType[]) => {
      for (let i = 0; i < data.length; i++) {
        this.types.push(data[i]);
      }
    });
  }

  create_resource(resource) {
    const r = JSON.stringify(resource);
    this.Server.create_resource(r).subscribe();
  }


  get carac() {
    return this.thirdFormGroup.get('typeCaracteristics') as FormArray;
  }

  addCarac() {
    for (let i = 1; i < this.keysNames.length; i++) {
      this.carac.push(this._formBuilder.group({caracValue: ''}));
    }
  }

  feedKeysNames(type) {
    let tmpType: ResourceType;
    for (let i = 0; i < this.types.length; i++) {
      if (this.types[i].name === type) {
        tmpType = this.types[i];
      }
    }
    this.keysNames = Object.keys(tmpType.typeCaracteristics);
    this.addCarac();
  }


  formatJson(type, typeName: string, name: string) {
    let res = {
      name: '',
      typeName: '',
      caracteristics: {}
    };
    for (let i = 0; i < type.typeCaracteristics.length; i++) {
      const tmpName = this.keysNames[i];
      const tmpValue = type.typeCaracteristics[i].caracValue;
      res.caracteristics[tmpName] = tmpValue;
    }
    res.name = name;
    res.typeName = typeName;
    console.log(res);
    this.create_resource(res);
  }
}
