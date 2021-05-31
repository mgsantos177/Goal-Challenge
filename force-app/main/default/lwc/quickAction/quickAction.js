import { LightningElement, api, wire } from 'lwc';
import getAllActivities from '@salesforce/apex/GoalController.getAllActivities';


export default class QuickAction extends LightningElement {
  @api recordId;

  @wire(getAllActivities,  {id: '$recordId'})
  activities;

  handleSubmit() {
    console.log(this.activities);
  }

}