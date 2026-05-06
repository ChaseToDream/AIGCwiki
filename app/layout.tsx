import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AI Gallery - AI绘画作品展示',
  description: '探索精选AI艺术作品，获取生成参数与灵感',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">{children}</body>
    </html>
  );
}
