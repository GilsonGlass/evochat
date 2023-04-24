import { buildPortalArticleURL, buildPortalURL } from '../portalHelper';

describe('PortalHelper', () => {
  describe('buildPortalURL', () => {
    it('returns the correct url', () => {
      window.evochatConfig = {
        hostURL: 'https://app.evochat.com',
        helpCenterURL: 'https://help.evochat.com',
      };
      expect(buildPortalURL('handbook')).toEqual(
        'https://help.evochat.com/hc/handbook'
      );
      window.evochatConfig = {};
    });
  });

  describe('buildPortalArticleURL', () => {
    it('returns the correct url', () => {
      window.evochatConfig = {
        hostURL: 'https://app.evochat.com',
        helpCenterURL: 'https://help.evochat.com',
      };
      expect(buildPortalArticleURL('handbook', 'culture', 'fr', 1)).toEqual(
        'https://help.evochat.com/hc/handbook/fr/culture/1'
      );
      window.evochatConfig = {};
    });
  });
});
