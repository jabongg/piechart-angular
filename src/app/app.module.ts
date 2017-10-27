import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { HttpClientJsonpModule } from '@angular/common/http';

// Import the Animations module
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GridModule } from '@progress/kendo-angular-grid';
// Import the ButtonsModule
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { Jsonp, JsonpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar.component';
import { EditService } from './services/edit.service';
import { RouterModule }   from '@angular/router';
import { PiechartComponent } from './piechart/piechart.component';
import { GraphComponent } from './graph/graph.component';
import { ChartsModule } from 'ng2-charts';

export let heroServiceFactory = (jsonp:Jsonp) => {
  return new EditService(jsonp);
}



@NgModule({
  declarations: [
    AppComponent,
    PiechartComponent,
    GraphComponent,
  ],
  imports: [
     JsonpModule,
    BrowserModule,
    FormsModule,
    HttpModule,
	  HttpClientJsonpModule,
	
    // Register the modules
    BrowserAnimationsModule,
    GridModule,
    ButtonsModule,
    DialogModule,
    InputsModule,
    ChartsModule,
    RouterModule.forRoot([
      {
        path: 'pie',
        component: PiechartComponent
      },
      {
        path: 'graph',
        component: GraphComponent
      }
    ])
  ],
  providers: [  
    {
      deps: [Jsonp],
      
    provide: EditService,
    useFactory: heroServiceFactory
    }],
  bootstrap: [AppComponent]
})

export class AppModule {jsonp:Jsonp }

