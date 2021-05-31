import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import NAME_FIELD from '@salesforce/schema/Activity__c.Name';
import ESTIMATED_HOURS_FIELD from '@salesforce/schema/Activity__c.EstimatedHours__c';
import REALIZED_HOURS_FIELD from '@salesforce/schema/Activity__c.RealizedHours__c';
import STATUS_FIELD from '@salesforce/schema/Activity__c.Status__c';
import { LightningElement, api, wire } from 'lwc';


const FIELDS = [NAME_FIELD, ESTIMATED_HOURS_FIELD, REALIZED_HOURS_FIELD, STATUS_FIELD ]

export default class ActivityCard extends LightningElement {
  @api activity;

  @wire(getRecord, { recordId: '$activity.Id', fields: FIELDS})
  activityData;

  get name() {
    return getFieldValue(this.activityData.data, NAME_FIELD);
  }

  get estimatedTime() {
  return getFieldValue(this.activityData.data, ESTIMATED_HOURS_FIELD);
    }

  get realizedTime() {
  return getFieldValue(this.activityData.data, REALIZED_HOURS_FIELD);
  }

  get status() {
    return getFieldValue(this.activityData.data, STATUS_FIELD);
}

  handleUpdateActivity(evt) {

    const updateActivity = new CustomEvent('updatelist', {
      detail: evt.detail
    });

    this.dispatchEvent(updateActivity);
  }

}