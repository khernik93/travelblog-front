import { Injectable } from '@angular/core';

@Injectable()
export class CookieService {

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
