import { QlikApp } from './../app/Types/QlikAPP';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { auth, spaces, items, users, apps } from '@qlik/api';
import { HostConfig } from '@qlik/api/auth';
import { QlikSpace } from '../app/Types/QlikSpace';
import { Space } from '@qlik/api/spaces';


import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QlikApiService {
  qlikConfig: HostConfig = {
    authType: 'oauth2', // The type of authentication to use
    host: 'karthikburra93.us.qlikcloud.com', // The host of the Qlik cloud tenant
    clientId: '5b7dfa0121e8ef0e3a5b17c50e41c23b', // The client ID for OAuth2 authentication
    redirectUri: 'https://localhost:4200/assets/oauth-redirect.html', // The redirect URI after successful authentication
    accessTokenStorage: 'session', // Where to store the access token
  };

  private token =
    'eyJhbGciOiJFUzM4NCIsImtpZCI6IjIwNDQ0YmU5LTA1OTMtNGU3Yi1iZDNjLTg4YzhlZmU0NTA3ZCIsInR5cCI6IkpXVCJ9.eyJzdWJUeXBlIjoidXNlciIsInRlbmFudElkIjoiSEI5cE5idXRMNWJDbXRWZmRhSGdBV0ZQRmlUOVBwekgiLCJqdGkiOiIyMDQ0NGJlOS0wNTkzLTRlN2ItYmQzYy04OGM4ZWZlNDUwN2QiLCJhdWQiOiJxbGlrLmFwaSIsImlzcyI6InFsaWsuYXBpL2FwaS1rZXlzIiwic3ViIjoiNjI0YjUwMGI1NGIyODU5ZTAzY2FlMjExIn0.6qWtjiFeuVUJ2jHjgepvObk9H21m_OTf1NivNTXm5NjAGkVEg5fNgDwHDd2M5TY2rvs4nw0CEQKlRP4LKYwkCMvHI8bW_eWygFFgxZ-Tsn_srsIAJv7BnTN0Dt0sMYLc';


    qlikApps: QlikApp[] = [];
  qlikSpaces: QlikSpace[] = [];
  appsBySpaceId: QlikApp[] = [];
  //recentlyUsedApps: QlikApp[] = [];
  private recentlyUsedAppsSubject = new BehaviorSubject<QlikApp[]>([]);
  public recentlyUsedApps$ = this.recentlyUsedAppsSubject.asObservable();

  constructor(private httpClient: HttpClient) {
    this.initQlik();
  }
  private initQlik(): void {
    auth.setDefaultHostConfig(this.qlikConfig);
  }
  addRecentlyUsed(appitem: QlikApp) {
    const currentApps = this.recentlyUsedAppsSubject.value;
    const index = currentApps.findIndex((app) => app.name === appitem.name);

    if (index !== -1) {
      currentApps.splice(index, 1);
    }

    currentApps.unshift(appitem);
    this.recentlyUsedAppsSubject.next(currentApps); // Emit the updated list
    console.log(`${appitem.name} added to the recently used list.`);
  }
  async getSpaces() {
    try {
      const { data: mySpaces } = await spaces.getSpaces({});
      this.qlikSpaces = [];
      mySpaces.data?.forEach((spaceobj) => {
        // this.qlikSpaces = [];
        const qlikSpace = new QlikSpace();
        qlikSpace.id = spaceobj.id;
        qlikSpace.name = spaceobj.name;
        qlikSpace.type = spaceobj.type;
        qlikSpace.routeType = 'space';

        this.qlikSpaces.push(qlikSpace);
      });
      return this.qlikSpaces;
    } catch (error) {
      console.error('Error fetching spaces:', error);
      throw error;
    }
  }

   async getMasterItems(){

     return await  apps.getAppDataLineage('8e328c54-92c8-487a-9286-c0aaef69c109')

   }
  async getApps() {
    try {
      this.qlikApps = [];
      const { data: myItems } = await items.getItems({
        resourceType: 'app',
        limit: 20,
        sort: '-updatedAt',
      });
      console.log('myItems', myItems);
      myItems.data.forEach((appobj) => {
        const qlikApp = new QlikApp();
        qlikApp.id = Number(appobj.id);
        qlikApp.name = appobj.name;
        qlikApp.link = appobj.links.open?.href?.toString() || '';
        qlikApp.thumbnail = appobj.links?.thumbnail?.href?.toString() || '';
        qlikApp.routeType = 'app';
        this.qlikApps.push(qlikApp);
      });
      return this.qlikApps;
    } catch (error) {
      console.error('Error fetching spaces:', error);
      throw error;
    }
  }

  async getSpacebyId(spaceid: string): Promise<Space> {
    try {
      const { data: mySpace } = await spaces.getSpace(spaceid);
      return mySpace;
    } catch (error) {
      console.error('Error fetching spaces:', error);
      throw error;
    }
  }

  async getAppsBySpaceId(spaceid: string) {
    try {
      this.appsBySpaceId = [];
      const { data: mySpaceAPPItems } = await items.getItems({
        spaceId: spaceid,
        resourceType: 'app',
        limit: 100,
      });
      console.log('mySpaceAPPItems', mySpaceAPPItems);
      mySpaceAPPItems.data.forEach((appobj) => {
        const qlikApp = new QlikApp();
        qlikApp.id = Number(appobj.id);
        qlikApp.name = appobj.name;
        qlikApp.link = appobj.links.open?.href?.toString() || '';
        qlikApp.routeType = 'app';
        this.appsBySpaceId.push(qlikApp);
      });
      return this.appsBySpaceId;
    } catch (error) {
      console.error('Error fetching spaces:', error);
      throw error;
    }
  }

  async getAppnames() {
    try {
      let header = new HttpHeaders({
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json',
      });
      return this.httpClient
        .get(
          'https://karthikburra93.us.qlikcloud.com/api/v1/items?resourceType=app&limit=100',
          { headers: header },
        )
        .subscribe((res: any) => {
          console.log('appnames data', res.data);
          res.data.forEach((appobj: any) => {
            const qlikApp = new QlikApp();
            qlikApp.id = appobj.id;
            qlikApp.name = appobj.name;
            this.qlikApps.push(qlikApp);
          });
        });
    } catch (error) {
      console.error(error);
    }
    return; // Add this line to return a value
  }
}
