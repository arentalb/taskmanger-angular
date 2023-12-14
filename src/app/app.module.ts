import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {environment} from "../environments/environment";
import {TaskListComponent} from './components/task-list/task-list.component';
import {TaskDetailComponent} from './components/task-detail/task-detail.component';
import {NewTaskComponent} from './components/new-task/new-task.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {TaskComponent} from "./components/task/task.component";
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import {AngularFireDatabaseModule} from "@angular/fire/compat/database";

@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    TaskDetailComponent,
    NewTaskComponent,
    PageNotFoundComponent,
    TaskComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    // provideAuth(() => getAuth()),
    // provideFirestore(() => getFirestore()),
    // provideDatabase(() => getDatabase())
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
