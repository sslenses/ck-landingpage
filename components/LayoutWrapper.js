'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  // Check if current path is a partner dashboard or login route
  const isMitra = pathname.startsWith('/mitra');

  return (
    <body style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {!isMitra && <Navbar />}
      <main style={{ flexGrow: 1, paddingTop: isMitra ? '0' : '72px' }}>
        {children}
      </main>
      {!isMitra && <Footer />}
    </body>
  );
}
