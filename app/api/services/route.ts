import { NextRequest, NextResponse } from 'next/server';
import { store } from '@/lib/store';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const includeInactive = searchParams.get('all') === 'true';
    const services = await store.getServicesAsync(includeInactive);
    return NextResponse.json({ success: true, services });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve services' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.name) {
      return NextResponse.json(
        { success: false, error: 'Service name is required' },
        { status: 400 }
      );
    }
    const saved = store.saveService(body);
    return NextResponse.json({ success: true, service: saved });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to save service' },
      { status: 500 }
    );
  }
}
