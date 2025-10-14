# docSections Consolidation Plan

## Summary
The three docSections files (docSections.tsx, docSections2.tsx, docSections3.tsx) are orphaned code that's not being imported anywhere. They contain documentation sections that have been replaced by individual component files.

## Content Migration Checklist

### From docSections.tsx:
- [ ] **finance-economy** - Contains JustSplit code example that might be useful
- [ ] **api-reference** - Has interactive code blocks with copy functionality
- [ ] **user-guides** - Contains detailed guide cards with time estimates
- [ ] **faq** - FAQ content (check if FAQ.tsx has all questions)

### From docSections2.tsx:
- [ ] **troubleshooting** - Detailed troubleshooting with severity levels (check Troubleshooting.tsx)
- [ ] **community** - Community events and governance structure (check Community.tsx)
- [ ] Philosophy/Vision/Roadmap/Portfolio redirects - Already handled by individual pages

### From docSections3.tsx:
- [ ] **development-setup** - Quick setup guide with code blocks (check DevelopmentSetup.tsx)
- [ ] **architecture** - Extensive shared component architecture docs (check SystemArchitecture.tsx)
- [ ] **hub-gateway** - Detailed hub proxy documentation (check HubGateway.tsx)

## Unique Features to Preserve:

1. **Interactive Code Blocks** (from api-reference):
   - Copy button functionality
   - "Try in Sandbox" button
   - "Open in API Playground" link

2. **Progress Indicators** with time estimates

3. **Guide Cards** with:
   - Time estimates (⏱️ 10-15 min)
   - Difficulty levels (📈 Beginner/Intermediate)

4. **Troubleshooting Severity Levels**:
   - 🚨 Critical
   - ⚠️ Common
   - Response time indicators

5. **Community Statistics**:
   - Member counts
   - Activity levels
   - Event calendars

## Recommendation:

1. **Verify all content exists** in the component files
2. **Migrate unique features** like interactive code blocks if missing
3. **Delete the three docSections files** to clean up the codebase
4. **Update imports** if any exist (none found in current search)

## Action Items:

1. Compare content between docSections and component files
2. Identify any missing content
3. Migrate missing content to appropriate components
4. Delete docSections files
5. Test documentation pages to ensure nothing is broken