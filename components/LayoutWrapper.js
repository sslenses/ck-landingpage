'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  // Hide landing page header/footer on partner dashboard routes, but show on login page
  const hideNavbarFooter = pathname.startsWith('/mitra') && pathname !== '/mitra/login';

  return (
    <body style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {!hideNavbarFooter && <Navbar />}
      <main style={{ flexGrow: 1, paddingTop: hideNavbarFooter ? '0' : '72px' }}>
        {children}
      </main>
      {!hideNavbarFooter && <Footer />}
    </body>
  );
}
