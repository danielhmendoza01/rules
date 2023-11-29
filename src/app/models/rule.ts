// Author: Preston Lee

import * as uuid from 'uuid';

export class Rule {
    static fromTemplate() {
      const r = new Rule();
      r.id = 'rule-' + uuid.v4().substring(0, 6);
      return r;
    }

    id: string = '';
    basis: { system: string, code: string, display: string } = { system: '', code: '', display: '' };
    labels: { system: string, code: string, display: string }[] = [];
    codeSets: {
        groupID: string,
        codes: Array<{
            system: string,
            code: string,
            confidence: number
        }>
    }[] = [];

}
