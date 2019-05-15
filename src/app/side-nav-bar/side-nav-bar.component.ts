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
  TREE_DATA: FoodNode[] = [];
  DISPLAY_RESOURCE = true;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

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
  }

  create_tree_type() {
    // reset de tree data pour éviter le dédoublement :
    this.TREE_DATA = [];
    this.Server.get_resource_by_type().subscribe((data: Ressources) => {
      for (const key in data) {
        let entry_temp = {
          name: 'Exemple child',
          children: [
          ]
        };
        entry_temp.name = key;
        const tmp = data[key];
        for (let i = 0 ; i < tmp.length ; i++) {
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
    const dialogRef = this.dialog.open(CreateResourceComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
