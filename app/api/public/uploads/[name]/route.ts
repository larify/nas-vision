import { errorResponse } from '@/lib/api/server';
import service from '@/lib/services/upload';

export async function GET(_request: Request, { params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const result = await service.read(name);

  if (!result.ok) {
    return errorResponse(result.error);
  }

  return new Response(result.value, {
    headers: {
      'Content-Type': 'application/octet-stream',
      'Content-Length': String(result.value.byteLength),
      'Cache-Control': 'no-store',
    },
  });
}
