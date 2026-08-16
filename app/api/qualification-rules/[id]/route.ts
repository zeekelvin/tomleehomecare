import { NextRequest, NextResponse } from 'next/server';
import { store } from '@/lib/store';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const rules = store.getQualificationRules();
    const rule = rules.find((r) => r.id === id);
    if (!rule) {
      return NextResponse.json({ success: false, error: 'Rule not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, rule });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to retrieve rule' }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const saved = store.saveQualificationRule({ ...body, id });
    return NextResponse.json({ success: true, rule: saved });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update rule' }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const deleted = store.deleteQualificationRule(id);
    if (!deleted) {
      return NextResponse.json({ success: false, error: 'Rule not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: 'Rule deleted' });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to delete rule' }, { status: 500 });
  }
}
