import {Component, ElementRef, Inject, Renderer2, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {Uploads} from "../uploads.service";
import {Settings} from "../../services/settings.service";

type uploadParams = {uri: string, httpParams: object};

@Component({
    selector: 'upload-file-modal',
    templateUrl: './upload-file-modal.component.html',
    styleUrls: ['./upload-file-modal.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class UploadFileModalComponent {

    /**
     * Name of current active tab.
     */
    public activeTab: string = 'upload';

    /**
     * Model for image url.
     */
    public linkModel: string;

    /**
     * File upload errors (if there are any).
     */
    public errors: object;

    /**
     * InsertImageModal Constructor.
     */
    constructor(
        private uploads: Uploads,
        private settings: Settings,
        private dialogRef: MatDialogRef<UploadFileModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: uploadParams,
    ) {}

    /**
     * Close modal and reset its state.
     */
    public close() {
        this.linkModel = null;
        this.dialogRef.close(this.linkModel);
    }

    /**
     * Fired when user is done with this modal.
     */
    public confirm() {
        if (this.errors || ! this.linkModel) return;
        this.dialogRef.close(this.linkModel);
    }

    /**
     * Set active tab to specified one.
     */
    public setActiveTab(name: string) {
        this.activeTab = name;
    }

    /**
     * Set specified link as link model.
     */
    public setLinkModel(link: string) {
        this.errors = null;

        this.validateImage(link).then(() => {
            this.linkModel = link;
        }).catch(() => {
            this.errors = {'*': 'The URL provided is not a valid image.'};
        });
    }

    /**
     * Open browser dialog for selecting files, upload files
     * and set linkModel to absolute url of uploaded image.
     */
    public uploadFiles(files: FileList) {
        this.errors = this.uploads.filesAreInvalid(files);
        if (this.errors) return;

        this.uploads.uploadFiles(files, this.data).subscribe(response => {
            this.linkModel = response.data[0].url;
            this.confirm();
        }, response => this.errors = response.messages);
    }

    /**
     * Check if image at specified url exists and is valid.
     */
    private validateImage(url: string): Promise<any> {
        return new Promise((resolve, reject) => {
            let timeout = 500;
            let timer, img = new Image();

            //image is invalid
            img.onerror = img.onabort = () => {
                clearTimeout(timer);
                reject();
            };

            //image is valid
            img.onload = function () {
                clearTimeout(timer);
                resolve();
            };

            //reject image if loading it times out
            timer = setTimeout(function () {
                img = null; reject();
            }, timeout);

            img.src = url;
        });
    }
}