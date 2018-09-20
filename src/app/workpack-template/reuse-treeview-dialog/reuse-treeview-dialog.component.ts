import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { WorkpackTemplate } from '../../model/workpack-template';


@Component({
  selector: 'app-reuse-treeview-dialog',
  templateUrl: './reuse-treeview-dialog.component.html',
  styleUrls: ['./reuse-treeview-dialog.component.css']
})
export class ReuseTreeviewDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ReuseTreeviewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public rootNode: WorkpackTemplate) {
      console.log('rootNode', rootNode);
    }

    onNoClick(): void {
      this.dialogRef.close();
    }

}
