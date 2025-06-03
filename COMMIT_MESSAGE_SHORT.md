# Short Commit Message

```
feat: implement SSO authentication and enhance Hub UI/UX

- Implement Single Sign-On with Hub as central auth provider
- Add cross-origin token-based authentication (SHA-256, 30s expiry)
- Create auth persistence with 5-minute cache for faster loads
- Fix dashboard loading states and Firebase emulator errors
- Enhance Hub dashboard with modern design and animations
- Update AppGrid cards to match design system
- Add Hub button to JustSplit navigation
- Integrate user settings with profile dropdown
- Fix JustSplit undefined eventId error
- Add comprehensive SSO documentation
- Improve auth performance and error handling

BREAKING CHANGES: None
MIGRATION: Apps need AuthTokenService for SSO participation

Co-Authored-By: Claude <noreply@anthropic.com>
```