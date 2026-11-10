import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "/vientiane";

/**
 * Returns the asset path prefixed with Next.js basePath (default: '/vientiane')
 * so that both Next.js Image Optimizer and standard <img> tags can resolve
 * static assets under subpath deployments without throwing 400 Bad Request.
 */
export function getAssetPath(src: string): string {
  if (!src) return src;
  if (
    src.startsWith("http://") ||
    src.startsWith("https://") ||
    src.startsWith("data:") ||
    src.startsWith("blob:")
  ) {
    return src;
  }
  const basePath = BASE_PATH.replace(/\/$/, "");
  if (!basePath) return src;
  const cleanSrc = src.startsWith("/") ? src : `/${src}`;
  return cleanSrc.startsWith(basePath) ? cleanSrc : `${basePath}${cleanSrc}`;
}
