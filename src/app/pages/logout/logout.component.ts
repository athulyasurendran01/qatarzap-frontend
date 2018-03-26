import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'ngx-logout',
  styleUrls: ['./logout.component.scss'],
  templateUrl: './logout.component.html',
})
export class LogoutComponent implements OnInit{
	ngOnInit() {
		window.open("http://test1.kraftivo.in/logout", "_self");
	}
}
