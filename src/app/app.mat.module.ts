import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {  MatFormFieldModule,
          MatInputModule,
          MatButtonModule, 
          MatIconModule, 
          MatDialogModule, 
          MatTreeModule,
          MatProgressSpinnerModule,
          MatRadioModule,
          MatSelectModule,
          MatExpansionModule,
          MatIconRegistry } from '@angular/material';
import 'hammerjs';

@NgModule({
  imports: [ 
    BrowserAnimationsModule, 
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule, 
    MatIconModule,
    MatDialogModule,
    MatTreeModule,
    MatRadioModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatExpansionModule
  ],
  exports: [ 
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule, 
    MatIconModule,
    MatDialogModule,
    MatTreeModule,
    MatRadioModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatExpansionModule  ]
})

export class AppMatModule {
  constructor(
    public matIconRegistry: MatIconRegistry) {
    matIconRegistry.registerFontClassAlias('fontawesome', 'fas');
  }
}