'use client';

import React from 'react';
import { ConfigDropdown } from '@cybereco/ui-components';
import { useI18n } from '@cybereco/i18n';

// This wrapper connects the ConfigDropdown to the real i18n context
export default function ConfigDropdownWrapper() {
  const { language, setLanguage, t } = useI18n();
  
  // Update the global context whenever language changes
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      // Store the current i18n context for the ConfigDropdown to use
      (window as any).__cybereco_current_i18n = { language, setLanguage, t };
    }
  }, [language, setLanguage, t]);
  
  return <ConfigDropdown />;
}