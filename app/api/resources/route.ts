import { NextRequest, NextResponse } from 'next/server';
import { store } from '@/lib/store';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const includeDrafts = searchParams.get('all') === 'true';
    const resources = await store.getResourcesAsync(includeDrafts);
    return NextResponse.json({ success: true, resources });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve resources' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.title || !body.content) {
      return NextResponse.json(
        { success: false, error: 'Title and content are required' },
        { status: 400 }
      );
    }
    const saved = store.saveResource(body);
    return NextResponse.json({ success: true, resource: saved });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to save resource' },
      { status: 500 }
    );
  }
}
