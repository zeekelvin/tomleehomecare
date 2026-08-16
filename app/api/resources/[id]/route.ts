import { NextRequest, NextResponse } from 'next/server';
import { store } from '@/lib/store';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const resources = store.getResources(true);
    const resource = resources.find((r) => r.id === id || r.slug === id);
    if (!resource) {
      return NextResponse.json({ success: false, error: 'Resource not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, resource });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to retrieve resource' }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const saved = store.saveResource({ ...body, id });
    return NextResponse.json({ success: true, resource: saved });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update resource' }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const deleted = store.deleteResource(id);
    if (!deleted) {
      return NextResponse.json({ success: false, error: 'Resource not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: 'Resource deleted' });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to delete resource' }, { status: 500 });
  }
}
