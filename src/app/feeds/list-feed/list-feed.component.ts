import { Component, OnInit } from '@angular/core';
import { FeedService } from '../feed.service';
import { AuthService } from 'src/app/auth/auth.service';
import { UserService } from 'src/app/users/user.service';
import { Feed } from '../feed.model';
import { filter } from 'minimatch';

@Component({
  selector: 'app-list-feed',
  templateUrl: './list-feed.component.html',
  styleUrls: ['./list-feed.component.css']
})
export class ListFeedComponent implements OnInit {

  feeds: Feed[];

  private orgId: string;

  userData: {
    id: string,
    name: string
  };

  constructor(private feedService: FeedService, private authService: AuthService, private userService: UserService) { }

  ngOnInit() {
    this.userData = this.authService.getAuthUserDetails();

    if (!this.userData.id) {
      return;
    }

    this.userService.getUser(this.userData.id).subscribe(response => {
      if (response.user) {
        this.orgId = response.user.organization_id;
      }
           if (!this.orgId) {
        return;
      }

      this.feedService.getFeeds(this.orgId).subscribe(feeds => {
        this.feeds = feeds.sort((a: Feed, b: Feed) => {
          return a.date.getTime() < b.date.getTime() ? 1 : a.date.getTime() > b.date.getTime() ? -1 : 0;
        });
        this.feeds.map(feed => {
          this.userService.getUser(feed.user_id).subscribe(userResponse => {
            if (userResponse.user) {
              feed.user_id = userResponse.user.first_name + ' ' + userResponse.user.last_name;
            }
            return feed;
          });
        });
      });
    });
  }
}
