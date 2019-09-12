import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  constructor(private httpClient: HttpClient) { }

  getFeeds(orgId) {
    return this.httpClient.get<{status: string, feeds: any}>(
      environment.serverAddress + 'api/feeds/' + orgId
    ).pipe(
      map(response => {
        return response.feeds.map(feed => {
          return {
            id: feed._id,
            title: feed.title,
            description: feed.description,
            image: feed.image,
            user_id: feed.user_id,
            organization_id: feed.organization_id,
            date: new Date(feed.date),
            active: feed.active,
            feed_type: feed.feed_type
          };
        });
      })
    );
  }
}
