import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

const buildPaths = (type: string, id: string) => {
  switch (type) {
    case 'release':
      return [`/catalog/r/${id}`];
    case 'series':
      return [`/catalog/s/${id}`, `/s/${id}`];
    case 'character':
      return [`/catalog/c/${id}`];
    case 'pet':
      return [`/catalog/p/${id}`];
    default:
      return [];
  }
};

export async function POST(req: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET;
  const auth = req.headers.get('authorization');

  if (!secret || auth !== `Bearer ${secret}`) {
    return NextResponse.json({ revalidated: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = (await req.json()) as {
      type?: string;
      id?: string;
      path?: string;
    };

    if (body.path) {
      revalidatePath(body.path);
      return NextResponse.json({ revalidated: true, paths: [body.path] });
    }

    if (!body.type || !body.id) {
      return NextResponse.json({ revalidated: false, message: 'Missing type or id' }, { status: 400 });
    }

    const paths = buildPaths(body.type, body.id);
    if (paths.length === 0) {
      return NextResponse.json({ revalidated: false, message: 'Unsupported type' }, { status: 400 });
    }

    paths.forEach((path) => revalidatePath(path));

    return NextResponse.json({ revalidated: true, paths });
  } catch (error) {
    return NextResponse.json({ revalidated: false, message: 'Invalid payload' }, { status: 400 });
  }
}
