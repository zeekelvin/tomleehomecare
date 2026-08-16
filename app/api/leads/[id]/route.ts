import { NextRequest, NextResponse } from 'next/server';
import { store } from '@/lib/store';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const leads = store.getLeads();
    const lead = leads.find((l) => l.id === id);
    if (!lead) {
      return NextResponse.json({ success: false, error: 'Lead not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, lead });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to get lead' }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const updates = await req.json();
    const updated = store.updateLead(id, updates);
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Lead not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, lead: updated });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update lead' }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const deleted = store.deleteLead(id);
    if (!deleted) {
      return NextResponse.json({ success: false, error: 'Lead not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: 'Lead deleted successfully' });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to delete lead' }, { status: 500 });
  }
}
