import { NextRequest, NextResponse } from 'next/server';
import { store } from '@/lib/store';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const includeDrafts = searchParams.get('all') === 'true';
    const faqs = await store.getFAQsAsync(includeDrafts);
    return NextResponse.json({ success: true, faqs });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve FAQs' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.question || !body.answer) {
      return NextResponse.json(
        { success: false, error: 'Question and answer are required' },
        { status: 400 }
      );
    }
    const saved = store.saveFAQ(body);
    return NextResponse.json({ success: true, faq: saved });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to save FAQ' },
      { status: 500 }
    );
  }
}
