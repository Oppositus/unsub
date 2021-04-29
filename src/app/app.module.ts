import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SubsComponent } from './components/subs/subs.component';
import { SubsNoDestroyComponent } from './components/subs-no-destroy/subs-no-destroy.component';
import { UnsubscribeAllComponent } from './components/unsubscribe-all/unsubscribe-all.component';
import { UnsubscribeMixComponent } from './components/unsubscribe-mix/unsubscribe-mix.component';
import { MixAllComponent } from './components/mix-all/mix-all.component';

@NgModule({
  declarations: [
    AppComponent,
    SubsComponent,
    SubsNoDestroyComponent,
    UnsubscribeAllComponent,
    UnsubscribeMixComponent,
    MixAllComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
