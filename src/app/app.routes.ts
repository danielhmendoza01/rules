import { Routes } from '@angular/router';
import { OpenComponent } from './open/open.component';
import { EditorComponent } from './editor/editor.component';
import { RuleComponent } from './rule/rule.component';

export const routes: Routes = [
    {
        path: '',
        component: OpenComponent
    },
    {
        path: 'editor',
        component: EditorComponent,
        children: [
            {
                path: 'rules/:id',
                component: RuleComponent
            }
        ]
    }
];
