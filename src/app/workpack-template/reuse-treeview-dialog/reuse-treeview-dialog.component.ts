import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { WorkpackTemplate } from '../../model/workpack-template';
import { DataService } from '../../data.service';
import { Subscription } from 'rxjs';
import { MatNestedTreeNode, MatTreeNode, MatTreeNestedDataSource } from '@angular/material/tree';
import { NestedTreeControl } from '@angular/cdk/tree';


@Component({
  selector: 'app-reuse-treeview-dialog',
  templateUrl: './reuse-treeview-dialog.component.html',
  styleUrls: ['./reuse-treeview-dialog.component.css']
})
export class ReuseTreeviewDialogComponent{

  nestedTreeControl: NestedTreeControl<WorkpackTemplate>;
  nestedDataSource: MatTreeNestedDataSource<WorkpackTemplate>;

  constructor(
    public dialogRef: MatDialogRef<ReuseTreeviewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private siblings: WorkpackTemplate[]
  ) {
      
      this.nestedTreeControl = new NestedTreeControl<WorkpackTemplate>(this._getChildren);
      this.nestedDataSource = new MatTreeNestedDataSource();

      this.nestedDataSource.data = this.siblings;

  }

  hasNestedChild = (_: number, nodeData: WorkpackTemplate) => nodeData.components.length > 0;

  private _getChildren = (node: WorkpackTemplate) => node.components;

  private subscriptions: Subscription[] = [];

  onNoClick(): void {
    this.dialogRef.close();
  }

}
