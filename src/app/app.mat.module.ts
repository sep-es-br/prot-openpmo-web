import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {  MatFormFieldModule,
          MatButtonModule, 
          MatIconModule, 
          MatDialogModule, 
          MatTreeModule,
          MatProgressSpinnerModule,
          MatRadioModule,
          MatSelectModule,
          MatIconRegistry } from '@angular/material';
import 'hammerjs';

@NgModule({
  imports: [ 
    BrowserAnimationsModule, 
    MatFormFieldModule,
    MatButtonModule, 
    MatIconModule,
    MatDialogModule,
    MatTreeModule,
    MatRadioModule,
    MatSelectModule,
    MatProgressSpinnerModule
  ],
  exports: [ 
    MatFormFieldModule,
    MatButtonModule, 
    MatIconModule,
    MatDialogModule,
    MatTreeModule,
    MatRadioModule,
    MatSelectModule,
    MatProgressSpinnerModule  ]
})

export class AppMatModule {
  constructor(
    public matIconRegistry: MatIconRegistry) {
    matIconRegistry.registerFontClassAlias('fontawesome', 'fas');
  }
}