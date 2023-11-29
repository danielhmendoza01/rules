import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { StatusService } from '../status.service';
import { BaseComponent } from '../base.component';
import { Rule } from '../models/rule';
import { FormsModule } from '@angular/forms';
import { CodeSet } from '../models/code_set';
import { CodeSetCoding } from '../models/code_set_coding';

@Component({
  selector: 'app-rule',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './rule.component.html',
  styleUrl: './rule.component.scss'
})
export class RuleComponent extends BaseComponent {


  rule: Rule | null = null;
  selectedCodeSet: CodeSet | null = null;
  showBulkImport: boolean = false;
  bulkImportSystem: string = '';
  bulkImportCodes: string = '';
  bulkImportConfidence: number = 1.0;

  constructor(private route: ActivatedRoute, protected http: HttpClient, protected dataService: DataService, protected statusService: StatusService) {
    super();
    console.log(RuleComponent.name + " initializing.");
    this.resetBulkImport();
    this.route.paramMap.subscribe(pm => {
      let w_id = pm.get('id')!;
      this.loadRuleFor(w_id);
    });
  }

  loadRuleFor(id: string) {
    this.selectedCodeSet = null;
    this.dataService.rules_file.subscribe(rf => {
      rf?.rules.forEach(r => {
        if (id == r.id) {
          this.rule = r;
          if (!this.rule.labels) {
            this.rule.labels = [];
          }
          if (this.rule.codeSets.length > 0) {
            this.selectedCodeSet = this.rule.codeSets[0];
          }
        }
      })
    });
  }

  createLabel() {
    this.rule?.labels.push(Rule.labelFromTemplate());
  }

  deleteLabel(i: number) {
    if (i !== undefined && i > -1) {
      this.rule?.labels.splice(i, 1);
    }
  }

  createCodeSet() {
    if (this.rule) {
      const cs = Rule.codeSetFromTemplate();
      this.rule?.codeSets.push(cs);
      this.selectedCodeSet = cs;
    }
  }

  deleteCodeSet(i: number) {
    if (i !== undefined && i > -1) {
      this.rule?.codeSets.splice(i, 1);
    }
  }

  selectCodeSet(cs: CodeSet) {
    this.selectedCodeSet = cs;
  }

  createCode() {
    this.selectedCodeSet?.codes.push(CodeSet.codeFromTemplate());
  }

  duplicateCode(code: CodeSetCoding) {
    const clone: CodeSetCoding = JSON.parse(JSON.stringify(code));
    this.selectedCodeSet?.codes.push(clone);
  }

  deleteCode(i: number) {
    if (i !== undefined && i > -1) {
      this.selectedCodeSet?.codes.splice(i, 1);
    }
  }

  toggleBulkImport() {
    this.showBulkImport = !this.showBulkImport;
  }

  runBulkImport() {
    const codes = this.bulkImportCodes.split(/\s/);
    codes.forEach(n => {
      if (n != '') {
        let c = new CodeSetCoding()
        c.system = this.bulkImportSystem;
        c.code = n;
        c.confidence = this.bulkImportConfidence;
        this.selectedCodeSet?.codes.push(c);
      }
    });
    this.resetBulkImport();
  }

  resetBulkImport() {
    this.showBulkImport = false;
    this.bulkImportSystem = '';
    this.bulkImportCodes = '';
    this.bulkImportConfidence = 1.0;
  }

  deduplicateCodes(cs: CodeSet) {
    let found: CodeSetCoding[] = [];
    let dupes: number[] = [];
    cs.codes.forEach((n, i) => {
      // let tmp = n.system + n.code;
      if (found.some(f => { return f.system == n.system && f.code == n.code })) {
        dupes.push(i);
      }
      found.push(n);
    })
    dupes.reverse();
    dupes.forEach(i => {
      cs.codes.splice(i, 1);
    });
  }

}
