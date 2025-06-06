#!/bin/bash

# Fix authLogging page keys
sed -i '' "s/t('documentation:authLogging\./t('documentation:documentationPage.authLogging./g" apps/website/src/app/documentation/auth-logging/page.tsx

# Fix jwt page keys  
sed -i '' "s/t('documentation:jwt\./t('documentation:documentationPage.jwt./g" apps/website/src/app/documentation/jwt-authentication/page.tsx

# Fix sso page keys
sed -i '' "s/t('documentation:sso\./t('documentation:documentationPage.sso./g" apps/website/src/app/documentation/sso-integration/page.tsx

# Fix privacy page keys
sed -i '' "s/t('documentation:privacy\./t('documentation:documentationPage.privacy./g" apps/website/src/app/documentation/privacy-controls/page.tsx

# Fix layout title key
sed -i '' "s/t('documentation:title')/t('documentation:documentationPage.title')/g" apps/website/src/app/documentation/layout.tsx
sed -i '' "s/t('documentation:search')/t('documentation:documentationPage.search')/g" apps/website/src/app/documentation/layout.tsx

echo "✅ Fixed documentation page translation keys"