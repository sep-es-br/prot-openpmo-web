import { Injectable } from '@angular/core';
import { MessageDialogComponent } from 'src/app/components/message-dialog/message-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class ErrorMessagingService {

  constructor(public dialog: MatDialog,) { }


  ///////////////////////////////////////////////////////////////////////
  //
  // Show an error message in a modal dialog box
  // 
  // Return: none
  // 
  ShowErrorMessage(error){
    this.dialog.open(MessageDialogComponent, { 
      data: {
        title: error.statusText,
        message: error.message,
        description: error.error.error_description,
        action: "OK"
      }
    });
  }  

}
