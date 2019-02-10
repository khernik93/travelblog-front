import { Injectable } from '@angular/core';
import { Location } from '@angular/common';

@Injectable()
export class PreviousRouteService {

  constructor(
    private location: Location
  ) { }

  public goBack() {
    return this.location.back();
  }

}
