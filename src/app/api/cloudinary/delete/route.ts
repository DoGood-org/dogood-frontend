import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

export async function POST(request: NextRequest): Promise<NextResponse> {
  if (
    !process.env.CLOUDINARY_CLOUD_NAME ||
    !process.env.CLOUDINARY_API_KEY ||
    !process.env.CLOUDINARY_API_SECRET
  ) {
    console.error('Cloudinary environment variables are not set');
    return NextResponse.json(
      { error: 'Cloudinary not configured' },
      { status: 500 }
    );
  }

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  try {
    const body = await request.json();
    const { url } = body;

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    const publicId = getPublicIdFromUrl(url);

    if (!publicId) {
      return NextResponse.json(
        { error: 'Invalid Cloudinary URL' },
        { status: 400 }
      );
    }

    const result = await Promise.race([
      cloudinary.uploader.destroy(publicId),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Cloudinary timeout')), 15000)
      ),
    ]);

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    console.error('Error in Cloudinary delete API:', error);

    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }

    if (error instanceof Error && error.message === 'Cloudinary timeout') {
      return NextResponse.json(
        { error: 'Cloudinary operation timed out' },
        { status: 504 }
      );
    }

    return NextResponse.json(
      { error: error?.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

const getPublicIdFromUrl = (url: string): string | null => {
  try {
    const match = url.match(/\/upload\/(?:v\d+\/)?(.+?)(?:\.[a-zA-Z0-9]+)?$/);
    return match && match[1] ? match[1] : null;
  } catch (error) {
    console.error('Error parsing URL:', error, url);
    return null;
  }
};
