/// <reference types="vite/client" />

// WebGPU navigator.gpu 类型补充（TypeScript DOM lib 尚未内置）
interface Navigator {
  gpu?: {
    requestAdapter(options?: Record<string, unknown>): Promise<unknown>;
  };
}
