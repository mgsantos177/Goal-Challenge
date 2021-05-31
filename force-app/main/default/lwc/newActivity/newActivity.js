import { api, LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import ACTIVITY_OBJECT from '@salesforce/schema/Activity__c';
import NAME_FIELD from '@salesforce/schema/Activity__c.Name';

export default class NewActivity extends LightningElement {
  @api goal;
  @api recordId; // GOAL Id
  @track isModalOpen = false;
  
  sessionTime;
  activityObject = ACTIVITY_OBJECT;
  nameField = NAME_FIELD;

  handleSubmit(event) {
    event.preventDefault();
    const fields = event.detail.fields;
    fields.Goal__c = this.goal;
    this.template.querySelector('lightning-record-edit-form').submit(fields);
  }

  handleSuccess(event) {
    const updatedRecord = event.detail.id;

    const updateList = new CustomEvent('createactivity', {
      detail: updatedRecord
    });

    this.dispatchEvent(updateList);
    this.showToast('Success', "Activity successfully created", 'success');
    this.closeModal()
}

  handleError(event){
 
    let message = event.detail.detail;
    //do some stuff with message to make it more readable
    
    this.showToast('Error', message, 'error');
    this.closeModal()
  }
  
    // modal
  openModal() {
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