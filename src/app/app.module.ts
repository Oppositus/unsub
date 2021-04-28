import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SubsComponent } from './components/subs/subs.component';
import { SubsNoDestroyComponent } from './components/subs-no-destroy/subs-no-destroy.component';

@NgModule({
  declarations: [
    AppComponent,
    SubsComponent,
    SubsNoDestroyComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
