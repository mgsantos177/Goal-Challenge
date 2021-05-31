import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import NAME_FIELD from '@salesforce/schema/Activity__c.Name';
import ESTIMATED_Hours_FIELD from '@salesforce/schema/Activity__c.EstimatedHours__c';
import REALIZED_Hours_FIELD from '@salesforce/schema/Activity__c.RealizedHours__c';
import STATUS_FIELD from '@salesforce/schema/Activity__c.Status__c';
import { LightningElement, api, wire } from 'lwc';

const FIELDS = [NAME_FIELD, ESTIMATED_Hours_FIELD, REALIZED_Hours_FIELD, STATUS_FIELD ]

export default class NewActivityCard extends LightningElement {
  @api activity;

  fields = FIELDS;

  @wire(getRecord, { recordId: '$activity.Id', fields: FIELDS})
  activityData;

  handleSubmit() {
    console.log(this.activity.Name);
  }

  connectedCallback() {
    console.log(this.activity);
}

  get name() {
    return getFieldValue(this.activityData.data, NAME_FIELD);
  }

//   get estimatedHours() {
//   return getFieldValue(this.activityData.data, ESTIMATED_Hours_FIELD);
//     }

//   get realizedHours() {
//   return getFieldValue(this.activityData.data, REALIZED_TIME_FIELD);
//   }

//   get status() {
//     return getFieldValue(this.activityData.data, STATUS_FIELD);
// }

}