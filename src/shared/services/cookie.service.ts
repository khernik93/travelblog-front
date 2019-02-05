import { Injectable } from '@angular/core';

@Injectable()
export class CookieService {

  /**
   * Get a cookie
   * @param key 
   */
  getCookie(key: string): string {
    var name = key + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  /**
   * Check if cookie is set
   * @param key 
   */
  isCookieSet(key: string): boolean {
    return document.cookie.indexOf(key) > -1;
  }

  /**
   * Remove a cookie by setting the oldest unix time
   * @param key 
   */
  removeCookie(key: string): void {
    document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }

}
