const DEFAULT_FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=800&q=80';

export function getEventImage(url: string | undefined): string {
  if (!url) return DEFAULT_FALLBACK_IMAGE;

  try {
    const imageUrl = new URL(url);
    
    // Handle Unsplash images
    if (imageUrl.hostname === 'images.unsplash.com') {
      const params = new URLSearchParams(imageUrl.search);
      params.set('w', '800');
      params.set('q', '80');
      params.set('auto', 'format');
      params.set('fit', 'crop');
      imageUrl.search = params.toString();
      return imageUrl.toString();
    }
    
    return url;
  } catch {
    return DEFAULT_FALLBACK_IMAGE;
  }
}