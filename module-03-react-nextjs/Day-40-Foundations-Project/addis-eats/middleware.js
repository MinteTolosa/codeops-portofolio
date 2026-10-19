import {NextResponse} from 'next/server';

export function middleware (request) {
    const session = request.cookies.get('session');

    if(!session) {
        return NextResponse.redirect(new URL('/signin', request.URL));
    }
    return NextResponse.next();
}