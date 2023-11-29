import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { StatusService } from '../status.service';
import { BaseComponent } from '../base.component';
import { Rule } from '../models/rule';

@Component({
  selector: 'app-rule',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rule.component.html',
  styleUrl: './rule.component.scss'
})
export class RuleComponent extends BaseComponent {

  rule: Rule | null = null;
  
  constructor(private route: ActivatedRoute, protected http: HttpClient, protected dataService: DataService, protected statusService: StatusService) {
    super();
    console.log(RuleComponent.name + " initializing.");
    this.route.paramMap.subscribe(pm => {
      let w_id = pm.get('id')!;
      this.loadRuleFor(w_id);
    });
  }

  loadRuleFor(id: string) {
    this.dataService.rules_file.subscribe(rf => {
      rf?.rules.forEach(r => {
        if (id == r.id) {
          this.rule = r;
        }
      })
    });
  }

}
