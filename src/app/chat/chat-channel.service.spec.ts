import { TestBed } from '@angular/core/testing';

import { ChatChannelService } from './chat-channel.service';

describe('ChatChannelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChatChannelService = TestBed.get(ChatChannelService);
    expect(service).toBeTruthy();
  });
});
