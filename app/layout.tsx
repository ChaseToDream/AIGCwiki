import type { Metadata } from 'next';
import { Sora, Noto_Sans_SC, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
});

const notoSansSC = Noto_Sans_SC({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-noto-sans-sc',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'AIGCwiki  |  AI 绘画展廊',
  description: '探索精选 AI 艺术作品，获取完整生成参数与灵感',
  openGraph: {
    title: 'AIGCwiki | AI 绘画展廊',
    description: '探索精选 AI 艺术作品，获取完整生成参数与灵感',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="zh-CN"
      className={`${sora.variable} ${notoSansSC.variable} ${jetbrainsMono.variable}`}
    >
      <body className="antialiased noise-bg">{children}</body>
    </html>
  );
}
