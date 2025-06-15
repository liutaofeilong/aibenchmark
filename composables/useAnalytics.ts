export const useAnalytics = () => {
  const trackEvent = (category: string, action: string, label?: string, value?: number) => {
    if (typeof window !== 'undefined') {
      // @ts-ignore
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value
      })
    }
  }

  const trackPageView = (path: string) => {
    if (typeof window !== 'undefined') {
      // @ts-ignore
      window.gtag('config', '11353713047', {
        page_path: path
      })
    }
  }

  return {
    trackEvent,
    trackPageView
  }
} 