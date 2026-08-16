import { NextRequest, NextResponse } from 'next/server';
import { store } from '@/lib/store';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const faqs = store.getFAQs(true);
    const faq = faqs.find((f) => f.id === id);
    if (!faq) {
      return NextResponse.json({ success: false, error: 'FAQ not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, faq });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to retrieve FAQ' }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const saved = store.saveFAQ({ ...body, id });
    return NextResponse.json({ success: true, faq: saved });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update FAQ' }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const deleted = store.deleteFAQ(id);
    if (!deleted) {
      return NextResponse.json({ success: false, error: 'FAQ not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: 'FAQ deleted' });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to delete FAQ' }, { status: 500 });
  }
}
