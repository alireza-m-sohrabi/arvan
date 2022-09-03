import { AuthEffects } from './auth/auth.effects';
import { ToastEffects } from './toast/toast.effects';

export const appEffects: any[] = [AuthEffects, ToastEffects];

export * from './auth/auth.effects';
export * from './toast/toast.effects';
