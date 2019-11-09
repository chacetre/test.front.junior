import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IDestination } from './destination.model';
import { IActivity } from './activity.model';
import { DestinationService } from '../destination';
import { Observable, of, merge } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
	selector: 'app-destination',
	templateUrl: './destination.component.html',
	styleUrls: ['./destination.component.scss']
})
export class DestinationComponent implements OnInit {
	destination: IDestination;
	activities: IActivity[];
	
	get bgImg() { return `url('${this.destination.bg}')`; }
	constructor(
		protected route: ActivatedRoute,
		protected http: HttpClient,
	) {}
	ngOnInit() {
		this.route.data
		.subscribe((data: { destination: IDestination }) => {
			this.destination = data.destination;
			this.getActivities(this.destination.id)
		});
	}

	getActivities(id : string) {

		this.searchActivities(id).subscribe(
			(data: IActivity[]) => {
			  this.activities = data;
			}
		  );
	}

	searchActivities(destinationId : string): Observable <IActivity[]> {

		const params = {} as any;
		params['destinationId$like'] = destinationId;
		return this.http.get<IActivity[]>(`/api/activities`, { params: params });
	}

}
