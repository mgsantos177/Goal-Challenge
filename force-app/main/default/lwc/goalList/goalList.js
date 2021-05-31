import { LightningElement } from 'lwc';
/** BearController.getAllBears() Apex method */
import getAllGoals from '@salesforce/apex/GoalController.getAllGoals';
export default class BearList extends LightningElement {
	goals;
	error;

	connectedCallback() {
		this.loadBears();
	}
	loadBears() {
		getAllGoals()
			.then(result => {
				this.goals = result;
			})
			.catch(error => {
				this.error = error;
			});
	}
}