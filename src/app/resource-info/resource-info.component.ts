import { Component, OnInit } from '@angular/core';
import {carac, Ressources} from '../interface/ressources';

@Component({
  selector: 'app-resource-info',
  templateUrl: './resource-info.component.html',
  styleUrls: ['./resource-info.component.css']
})
export class ResourceInfoComponent implements OnInit {
  public data: any;
  resource: Ressources;
  caracteristicsName: string[] = [];
  caracteristicsValue: string[] = [];

  constructor() { }

  ngOnInit() {
    this.resource = this.data.infosResource;
    Object.keys(this.resource.caracteristics).forEach(key => {
      let value = this.resource.caracteristics[key];
      this.caracteristicsName.push(key);
      this.caracteristicsValue.push(value);
    });
  }

}
