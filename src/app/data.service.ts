// Author: Preston Lee

import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { StatusService } from './status.service';
import { RulesFile } from './models/rules_file';
import { ToastService } from './toast.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataService implements OnInit {

  public default_url: string | null = null;
  public loading = false;
  public rules_file: BehaviorSubject<RulesFile | null> = new BehaviorSubject<RulesFile | null>(null);


  constructor(protected http: HttpClient, protected statusService: StatusService, protected toastService: ToastService, protected router: Router) {
    this.default_url = (window as any)['DEFAULT_RULES_FILE_URL'].toString();
    if (this.default_url && this.default_url.length > 0) {
      console.log("Default rules file URL provided. Will attempt to load: " + this.default_url);
      this.loadFromUrl(this.default_url);
    } else {
      console.log("No default data URL provided.");
    }
  }
  ngOnInit(): void {
  }



  loadFromUrl(url: string) {
    this.loading = true;
    this.http.get<RulesFile>(url).subscribe({
      next: (rf => {
        this.loading = false;
        this.statusService.updatePermissionsFor(rf);
        this.rules_file.next(rf);
        this.toastService.showSuccessToast("File Loaded!", "Starting app...");
        this.statusService.editing = false; // Seems reasonable
        this.router.navigate(['editor']);
      }),
      error: (e => {
        this.toastService.showWarningToast("Couldn't load URL", "The remote rules file URL couldn't be loaded, sorry. Check the URL and your connectivity and try again.");
      })
    });
    // this.rules_file = this.http.get<RulesFile>(url);
    // ?    return this.rules_file;
  }

}

