import { LightningElement, api, wire, track } from 'lwc';
import { refreshApex } from '@salesforce/apex';
import getAllActivities from '@salesforce/apex/GoalController.getAllActivities';

export default class ActivityList extends LightningElement {
  @api recordId; // GOAL Id
  
  @wire(getAllActivities,  {id: '$recordId'})
  activities;

  handleUpdateList(evt) {
    refreshApex(this.activities);
  }

  handleTileClick() {
    const event = new CustomEvent('modalclick', {
      detail: this.activities.fields.Id.value
    });

    this.dispatchEvent(event);
  }

}