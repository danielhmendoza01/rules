import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { ToastService } from "./toast.service";
import { ToastComponent } from "./toast/toast.component";
import { ToasterComponent } from "./toaster/toaster.component";

// Author: Preston Lee
// @Component({
//     selector: 'base',
//     standalone: true,
//     imports: [CommonModule, ToasterComponent, ToastComponent, RouterModule, FormsModule],
//     template: 'ABSTRACT',
//     providers: [ToastService]
//   })
export abstract class BaseComponent {

    canMoveUp<T>(item: T, within: Array<T>): boolean {
        return within.indexOf(item) > 0;
    }

    canMoveDown<T>(item: T, within: Array<T>): boolean {
        return within.indexOf(item) < within.length - 1;
    }

    moveUp<T>(item: T, within: Array<T>): void {
        if (within.length > 1) {
            let i: number = within.indexOf(item, 0);
            if (i > 0) {
                let tmp: T = within[i - 1];
                within[i - 1] = within[i];
                within[i] = tmp;
            }

        }
    }

    moveDown<T>(item: T, within: Array<T>): void {
        if (within.length > 1) {
            let i: number = within.indexOf(item, 0);
            if (i < within.length - 1) {
                let tmp: T = within[i + 1];
                within[i + 1] = within[i];
                within[i] = tmp;
            }
        }
    }

    moveUpByIndex<T>(i: number, within: Array<T>): void {
        if (within.length > 1 && i > 0) {
            // let i: number = within.indexOf(item, 0);
            if (i > 0) {
                let tmp: T = within[i - 1];
                within[i - 1] = within[i];
                within[i] = tmp;
            }
        }
    }

    moveDownByIndex<T>(i: number, within: Array<T>): void {
        if (within.length > 1 && i < within.length - 1) {
            // let i: number = within.indexOf(item, 0);
            // if (i < within.length - 1) {
                let tmp: T = within[i + 1];
                within[i + 1] = within[i];
                within[i] = tmp;
            // }
        }
    }

}
