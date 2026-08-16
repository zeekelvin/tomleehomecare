import { NextRequest, NextResponse } from 'next/server';
import { store } from '@/lib/store';

export async function GET(req: NextRequest) {
  try {
    const rules = await store.getQualificationRulesAsync();
    return NextResponse.json({ success: true, rules });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve qualification rules' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.name || !body.field || body.score === undefined) {
      return NextResponse.json(
        { success: false, error: 'Name, field, and score are required' },
        { status: 400 }
      );
    }
    const saved = store.saveRule(body);
    return NextResponse.json({ success: true, rule: saved });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to save qualification rule' },
      { status: 500 }
    );
  }
}
