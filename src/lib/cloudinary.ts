export const deleteFromCloudinary = async (url: string): Promise<any> => {
  if (!isCloudinaryUrl(url)) {
    console.error('Not a valid Cloudinary URL:', url);
    return { error: 'Not a Cloudinary URL' };
  }

  try {
    const response = await fetch('/api/cloudinary/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    });

    const contentType = response.headers.get('content-type');
    let data;

    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      const text = await response.text();
      console.error('Non-JSON response:', text);
      throw new Error(
        `Server returned ${response.status}: ${text.substring(0, 100)}`
      );
    }

    if (!response.ok) {
      return {
        error: data.error || `HTTP ${response.status}: Failed to delete image`,
        details: data,
        url,
      };
    }

    if (data.result !== 'ok' && data.result !== 'not found') {
      return {
        error: data.error?.message || `Cloudinary error: ${data.result}`,
        details: data,
        url,
      };
    }

    return data;
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error);
    return {
      error: error instanceof Error ? error.message : String(error),
      url,
    };
  }
};

export const isCloudinaryUrl = (url: string): boolean => {
  return (
    typeof url === 'string' &&
    url.includes('cloudinary.com') &&
    url.includes('/upload/')
  );
};
