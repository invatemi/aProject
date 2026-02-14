import { z } from 'zod';

const createApiError = (error: unknown, context: string): Error => {
  if (error instanceof z.ZodError) {
    const issues = error.issues
      .map(issue => `${issue.path.join('.')}: ${issue.message}`)
      .join('; ');
    return new Error(`[API] ${context} | Валидация: ${issues}`);
  }
  return error instanceof Error 
    ? new Error(`[API] ${context} | ${error.message}`)
    : new Error(`[API] ${context} | Неизвестная ошибка`);
};

export const apiRequest = async <T>(
  fetchFn: () => Promise<Response>,
  parseFn: (data: unknown) => T,
  context: string
): Promise<T> => {
  try {
    const response = await fetchFn();
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status} ${response.statusText}`);
    }
    
    const rawData = await response.json();
    return parseFn(rawData);
  } catch (error) {
    console.error(`[API ERROR] ${context}:`, error);
    throw createApiError(error, context);
  }
};