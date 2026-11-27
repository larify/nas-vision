import { NextResponse, type NextRequest } from 'next/server';
import { appError, errorResponse } from '@/lib/api';
import { auth } from '@/lib/auth';
import configService from '@/lib/services/config';

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = await auth.api.getSession({ headers: request.headers });

  if (session) {
    return NextResponse.next();
  }

  if (pathname.startsWith('/api/')) {
    return errorResponse(
      appError('common.UNAUTHORIZED'),
      configService.list({ language: request.cookies.get('language')?.value }).language,
    );
  }

  return NextResponse.redirect(new URL('/', request.url));
}

export const config = {
  matcher: [
    '/resources/:path*',
    '/api/apps/:path*',
    '/api/config/:path*',
    // 插件使用接口免登录，仅管理接口鉴权。
    '/api/plugin/:action(list|config|update)/:path*',
    '/api/upload/:path*',
    // 其他 API 默认鉴权，认证入口与公开接口除外。
    '/api/((?!(?:auth|public|apps|config|plugin|upload)(?:/|$)).*)',
    '/((?!$|api/|resources(?:/|$)|_next(?:/|$)|static(?:/|$)|favicon\\.ico$).*)',
  ],
};
