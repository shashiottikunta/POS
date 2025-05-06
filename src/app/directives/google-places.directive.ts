import { MapsAPILoader } from '@agm/core';
import { Directive, ElementRef, EventEmitter, OnInit, Output } from '@angular/core';
import { isBlank } from '../shared/utils/utils';

declare var google: any;

@Directive({
	selector: '[google-place]'
})
export class GooglePlacesDirective implements OnInit {
	@Output() onSelect: EventEmitter<any> = new EventEmitter();
	private readonly element: HTMLInputElement;

	constructor(private readonly mapsAPILoader: MapsAPILoader, elRef: ElementRef) {
		// elRef will get a reference to the element where
		// the directive is placed
		this.element = elRef.nativeElement;
	}

	// getFormattedAddress(place) {
	// 	// @params: place - Google Autocomplete place object
	// 	// @returns: location_obj - An address object in human readable format
	// 	console.log(place)
	// 	const location_obj = {};
	// 	for (const i in place.address_components) {
	// 		const item = place.address_components[i];

	// 		location_obj['formatted_address'] = place.formatted_address;
	// 		if (item['types'].indexOf('locality') > -1) {
	// 			location_obj['locality'] = item['long_name'];
	// 		} else if (item['types'].indexOf('administrative_area_level_1') > -1) {
	// 			location_obj['admin_area_l1'] = item['short_name'];
	// 		} else if (item['types'].indexOf('street_number') > -1) {
	// 			location_obj['street_number'] = item['short_name'];
	// 		} else if (item['types'].indexOf('route') > -1) {
	// 			location_obj['route'] = item['long_name'];
	// 		} else if (item['types'].indexOf('country') > -1) {
	// 			location_obj['country'] = item['short_name'];
	// 		} else if (item['types'].indexOf('postal_code') > -1) {
	// 			location_obj['postal_code'] = item['short_name'];
	// 		}
	// 		location_obj['name'] = place.name;
	// 		location_obj['street_address'] = `${!isBlank(location_obj['street_number'])
	// 			? location_obj['street_number']
	// 			: ''}${!isBlank(location_obj['street_number']) && !isBlank(location_obj['route']) ? ' ' : ''}${!isBlank(
	// 			location_obj['route']
	// 		)
	// 			? location_obj['route']
	// 			: ''}
	// 		`;
	// 		location_obj['street_address'] = location_obj['street_address'].trim();
	// 	}
	// 	console.log(location_obj)
	// 	return location_obj;
	// }

	ngOnInit(): void {
		this.mapsAPILoader.load().then(
			() => {
				const autocomplete = new google.maps.places.Autocomplete(this.element);
				// Event listener to monitor place changes in the input
				google.maps.event.addListener(
					autocomplete,
					'place_changed',
					() => {
						// Emit the new address object for the updated place
						//this.onSelect.emit(this.getFormattedAddress(autocomplete.getPlace()));
					},
					//(error) => {}
				);
			},
			(error) => {}
		);
	}
}
