import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

interface CloudinarySuccessResponse {
  result: string;
  [key: string]: any;
}

const CLOUDINARY_TIMEOUT = 15000;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest): Promise<NextResponse> {
  if (!cloudinary.config().cloud_name) {
    return NextResponse.json(
      { error: 'Cloudinary not configured' },
      { status: 500 }
    );
  }

  try {
    const { url } = await request.json();

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

    const result = await destroyWithTimeout(publicId, CLOUDINARY_TIMEOUT);
    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    console.error('Cloudinary delete error:', error);

    if (error.name === 'AbortError') {
      return NextResponse.json(
        { error: 'Cloudinary operation timed out' },
        { status: 504 }
      );
    }

    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: error?.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

const destroyWithTimeout = (
  publicId: string,
  timeoutMs: number
): Promise<CloudinarySuccessResponse> => {
  return new Promise<CloudinarySuccessResponse>((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('AbortError')), timeoutMs);

    cloudinary.uploader
      .destroy(publicId)
      .then((res) => {
        clearTimeout(timer);
        resolve(res as CloudinarySuccessResponse);
      })
      .catch((err) => {
        clearTimeout(timer);
        reject(err);
      });
  });
};

const getPublicIdFromUrl = (url: string): string | null => {
  try {
    const match = url.match(/\/upload\/(?:v\d+\/)?(.+?)(?:\.[a-zA-Z0-9]+)?$/);
    return match?.[1] ? decodeURIComponent(match[1]) : null;
  } catch {
    return null;
  }
};
