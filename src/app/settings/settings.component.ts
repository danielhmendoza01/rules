// Author: Preston Lee

import { Component, OnInit } from '@angular/core';
import { SettingsService } from './settings.service';
import { ToastService } from '../toast.service';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(protected toastService: ToastService, protected settingsService: SettingsService, public location: Location) {
  }

  ngOnInit() {
    this.reload();
  }

  reload() {
    this.settingsService.reload();
  }

  save() {
    this.settingsService.saveSettings();
    this.toastService.showSuccessToast("Settings Saved", "Settings are local to your browser only.")
  }

  restore() {
    this.settingsService.forceResetToDefaults();
    this.toastService.showSuccessToast("Settings Restored", "All settings have been restored to their defaults.")

  }

  back() {
    this.location.back();
  }

}
