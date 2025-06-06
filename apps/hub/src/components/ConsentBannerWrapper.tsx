'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@cybereco/auth';
import ConsentBanner from './ConsentBanner/ConsentBanner';

export default function ConsentBannerWrapper() {
  const [canRender, setCanRender] = useState(false);

  useEffect(() => {
    // Delay rendering to ensure Firebase is fully initialized
    const timer = setTimeout(() => {
      setCanRender(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Try to get auth context
  let authReady = false;
  try {
    const { isLoading } = useAuth();
    authReady = !isLoading;
  } catch (error) {
    // Auth context not available yet
    return null;
  }

  // Only render ConsentBanner when auth is ready and Firebase is initialized
  if (!authReady || !canRender) {
    return null;
  }

  return <ConsentBanner />;
}