import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { OpenComponent } from './open/open.component';
import { DataService } from './data.service';
import { StatusService } from './status.service';
import { HttpClientModule } from '@angular/common/http';
import { ToastComponent } from './toast/toast.component';
import { ToasterComponent } from './toaster/toaster.component';
import { ToastService } from './toast.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,
    RouterOutlet,
    OpenComponent,
    ToasterComponent,
    ToastComponent,
    FormsModule,
    RouterModule,
    HttpClientModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [DataService, StatusService, ToastService]
})
export class AppComponent {
  title = 'rules';
}
