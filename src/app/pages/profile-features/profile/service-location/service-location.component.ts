import { Component, OnInit, OnDestroy, ViewContainerRef } from '@angular/core';
import { UserService } from '../../../../@core/data/users.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'ngx-service-location',
  styleUrls: ['./service-location.component.scss'],
  templateUrl: './service-location.component.html',
})
export class ServiceLocationComponent implements OnInit, OnDestroy{
  
  public map: any;
  public marker: any;
  public cityCircle: any;
  public lat: any;
  public lng: any;
  
  constructor(private userService: UserService, public toastr: ToastsManager, vcr: ViewContainerRef){
    this.toastr.setRootViewContainerRef(vcr);
  }

	ngOnInit() {
		this.loadMap();
		this.getCurrentLocation();
	}
	
	getCurrentLocation(){
		this.userService.apiTokenRequestGet('professional/profile/service_location')
		  .subscribe((res: any) => {
			if(res.response == 1){
				this.lat = res.lat;
				this.lng = res.lng;
			}else{
			  if(res.errcode == 753){
				this.userService.errorChecking(res);
			  }else{
				this.toastr.error(res.message, 'Oops!');
			  } 
			}
		  }, error => {
			this.userService.errorRouting();        
		});
	}
	
	loadMap(){
		this.map = new google.maps.Map(document.getElementById('map-container'), {
			center: {lat: this.lat, lng: this.lng},
			zoom: 8,
			disableDefaultUI: true
		});
		
		this.marker = new google.maps.Marker({
		  map: this.map,
		  position: this.map.getCenter(),
		  draggable:true,
		});
		
		this.cityCircle = new google.maps.Circle({
			strokeColor: '#FF0000',
			strokeOpacity: 0.8,
			strokeWeight: 2,
			fillColor: '#FF0000',
			fillOpacity: 0.35,
			map: this.map,
			center: this.map.getCenter(),
			radius: 5000,
			editable: true
		});
		
		var options = {
		  componentRestrictions: {country: 'IN'}
		};

		let input = document.getElementById('pac-input');
		let autocomplete = new google.maps.places.Autocomplete(input, options);
		let that_ = this;
		autocomplete.addListener('place_changed', function() {
		  let place = autocomplete.getPlace();
		  that_.marker.setPosition(place.geometry.location);
		  that_.map.setCenter(that_.marker.getPosition())
		});
		autocomplete.bindTo('bounds', this.map);
		autocomplete.setOptions({strictBounds: true});
		this.marker.addListener('dragend', function(){
			let bounds = that_.cityCircle.getBounds();
			let position = that_.marker.getPosition();
			if(!bounds.contains(position) && 
				google.maps.geometry.spherical.computeDistanceBetween(that_.cityCircle.getCenter(), position) 
					>= that_.cityCircle.getRadius()){
				that_.marker.setPosition(that_.map.getCenter())
			}
		});
		this.cityCircle.addListener('center_changed', function(){
			let position = that_.cityCircle.getCenter();
			that_.marker.setPosition(position);
			that_.map.setCenter(position)
		});
	}
	saveServiceLocation(){
		let data = {
			latitude: this.marker.getPosition().lat(),
			longitude: this.marker.getPosition().lng(),
			radius: this.cityCircle.getRadius()
		};
		this.userService.apiTokenRequest('professional/profile/service_location', data)
		  .subscribe((res: any) => {
			if(res.response == 1){
			  this.toastr.success("Successfully Updated", 'Success!');
			}else{
			  if(res.errcode == 753){
				this.userService.errorChecking(res);
			  }else{
				this.toastr.error(res.message, 'Oops!');
			  } 
			}
		  }, error => {
			this.userService.errorRouting();        
		});
	}

  ngOnDestroy() {
  }
}
