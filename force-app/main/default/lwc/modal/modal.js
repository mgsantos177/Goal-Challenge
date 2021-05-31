import { api, LightningElement,track, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import NAME_FIELD from '@salesforce/schema/Activity__c.Name';

import STATUS_FIELD from '@salesforce/schema/Activity__c.Status__c';
import {  getRecord } from 'lightning/uiRecordApi';

const FIELDS = [NAME_FIELD, STATUS_FIELD ]

export default class ModalPopupLWC extends LightningElement {
    //Boolean tracked variable to indicate if modal is open or not default value is false as modal is closed when page is loaded 
    @track isModalOpen = false;
    @api activity;
    
    @wire(getRecord, { recordId: '$activity.Id', fields: FIELDS })
    activityData;


    handleSubmit(event){
        event.preventDefault();  
        const fields = event.detail.fields;
        this.template.querySelector('lightning-record-edit-form').submit(fields);
        
     }
     handleSuccess(event){
        const updatedRecord = event.detail.id;
        const updateActivity = new CustomEvent('updateactivity', {
            detail: updatedRecord
          });
      
        this.dispatchEvent(updateActivity);

        this.showToast('Success', "Activity successfully updated", 'success');
        this.closeModal()
     }

     handleError(event){
       
        let message = event.detail.detail;
    //do some stuff with message to make it more readable
    
        this.showToast('Error', message, 'error');
        this.closeModal()
  }

    // modal
    openModal(evt) {
        // to open modal set isModalOpen tarck value as true


        this.isModalOpen = true;
    }
    closeModal() {
        // to close modal set isModalOpen tarck value as false
        this.isModalOpen = false;
    }

    showToast(theTitle, theMessage, theVariant) {
        const event = new ShowToastEvent({
            title: theTitle,
            message: theMessage,
            variant: theVariant
        });
      this.dispatchEvent(event);
    }
}