import {Component, OnInit} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ServerService} from '../server.service';
import {Ressources} from '../interface/ressources';
import {MatDialog} from '@angular/material';
import {strictEqual} from 'assert';
import * as $ from 'jquery';
import {CreateResourceComponent} from '../create-resource/create-resource.component';
import {LoginComponent} from '../login/login.component';
import {ChoiceCreationComponent} from '../choice-creation/choice-creation.component';
import {CreateTypeComponent} from '../create-type/create-type.component';
import {ResourceInfoComponent} from '../resource-info/resource-info.component';
import {TutorielComponent} from '../tutoriel/tutoriel.component';
import {ReservationByTypeComponent} from '../reservation-by-type/reservation-by-type.component';
import {computeStyle} from '@angular/animations/browser/src/util';

/**
 * Food data with nested structure.
 * Each node has a name and an optiona list of children.
 */
interface FoodNode {
  name: string;
  children?: FoodNode[];
}

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-side-nav-bar',
  templateUrl: './side-nav-bar.component.html',
  styleUrls: ['./side-nav-bar.component.css']
})
export class SideNavBarComponent implements OnInit {
  tuto = false;
  TREE_DATA: FoodNode[] = [];
  DISPLAY_RESOURCE = true;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  resources: Ressources[] = [];

  private transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
    this.transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);


  constructor(private breakpointObserver: BreakpointObserver, private Server: ServerService, public dialog: MatDialog) {
    this.dataSource.data = this.TREE_DATA;
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  ngOnInit() {
    this.create_tree_type();
    //this.displayTutoriel();
    this.Server.get_resources().subscribe((data: Ressources) => {
      for (const r in data) {
        this.resources.push(data[r]);
      }
    });
    console.log(this.resources);
  }

  create_tree_type() {
    // reset de tree data pour éviter le dédoublement :
    this.TREE_DATA = [];
    this.Server.get_resource_by_type().subscribe((data: Ressources) => {
      for (const key in data) {
        let entry_temp = {
          name: 'Exemple child',
          children: []
        };
        entry_temp.name = key;
        const tmp = data[key];
        for (let i = 0; i < tmp.length; i++) {
          entry_temp.children.push({name: tmp[i]});
        }
        this.TREE_DATA.push(entry_temp);
        this.dataSource.data = this.TREE_DATA;
      }
    });
  }

  ToogleDisplayResource() {
    this.DISPLAY_RESOURCE = !this.DISPLAY_RESOURCE;
    this.create_tree_type();
  }

  openDialog() {
    const dialogRef = this.dialog.open(ChoiceCreationComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  displayLoginPage() {
    const dialogRef = this.dialog.open(LoginComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }


  deleteResource(r: FoodNode) {
    console.log(r.name);
    this.Server.delete_resource(r.name).subscribe();
  }

  displayTutoriel() {
    //if (!this.tuto) {
    const dialog = this.dialog.open(TutorielComponent);
    // this.tuto = true;
    //}
  }

  displayReservationByType(typeClicked) {
    const type: string = typeClicked.name;
    console.log(type);
    const dialog = this.dialog.open(ReservationByTypeComponent);
    dialog.componentInstance.data = {
      myType: type
    };
  }

  displayInfosResource(resourceClicked) {
    const resource: Ressources = this.resources.find(x => x.name === resourceClicked.name)
    const dialog = this.dialog.open(ResourceInfoComponent);
    dialog.componentInstance.data = {
      infosResource: resource
    };
  }
}
