#!/bin/bash

# Fix all documentationPage keys in CoreDocs.tsx to use documentation: namespace
sed -i '' "s/t('documentationPage\./t('documentation:documentationPage./g" apps/website/src/app/documentation/components/CoreDocs.tsx

echo "✅ Fixed namespace prefixes in CoreDocs.tsx"