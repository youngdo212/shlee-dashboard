import { useEffect } from 'react';

export default function useRemoveLoadingIcon() {
  useEffect(() => {
    const bodyEl = document.body;
    const loadingEl = document.getElementById('init-loading');

    if (loadingEl) {
      bodyEl.removeChild(loadingEl);
    }
  }, []);
}
