import { Component } from '@angular/core';
import { SuiModal, ComponentModalConfig, ModalSize } from "@giomamaladze/ng2-semantic-ui";

interface IConfirmModalContext {
    question: string;
    title?: string;
    cancelButton?: string;
    confirmButton?: string;
}

@Component({
    selector: "modal-confirm",
    template: `
<div class="header" *ngIf="modal.context.title">{{ modal.context.title }}</div>
<div class="content">
    <p>{{ modal.context.question }}</p>
</div>
<div class="actions">
    <button class="ui red button" (click)="modal.deny(undefined)">{{ modal.context.cancelButton || "Cancel" }}</button>
    <button class="ui green button" (click)="modal.approve(undefined)" autofocus>{{ modal.context.confirmButton || "OK" }}</button>
</div>
`
})
export class ConfirmModalComponent {
    constructor(public modal:SuiModal<IConfirmModalContext, void, void>) {
    }
}

export class ConfirmModal extends ComponentModalConfig<IConfirmModalContext, void, void> {
    constructor(question: string, title?: string, confirmButton?: string, cancelButton?: string) {
        super(ConfirmModalComponent, { question, title, confirmButton, cancelButton });
        this.isClosable = false;
        this.transitionDuration = 200;
        this.size = ModalSize.Small;
    }
}
