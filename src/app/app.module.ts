import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactWrapperComponent } from './components/react-wrapper/react-wrapper.component';
import { FlowDiagramComponent } from './flow-diagram/flow-diagram.component';

@NgModule({
  declarations: [
    AppComponent,
    ReactWrapperComponent,
    FlowDiagramComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
