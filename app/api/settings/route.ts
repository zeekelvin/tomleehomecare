import { NextRequest, NextResponse } from 'next/server';
import { store } from '@/lib/store';

export async function GET(req: NextRequest) {
  try {
    const settings = await store.getSiteSettingsAsync();
    return NextResponse.json({ success: true, settings });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve settings' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const updated = store.updateSiteSettings(body);
    return NextResponse.json({ success: true, settings: updated });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to update settings' },
      { status: 500 }
    );
  }
}
