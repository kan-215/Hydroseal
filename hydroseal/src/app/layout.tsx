import '../../styles/globals.scss';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Analytics } from "@vercel/analytics/react";

export const metadata = {
  title: 'Hydroseal Innovations | Water Tank Solutions in Kenya',
  description: 'Concrete and steel water tank repair, construction, and cleaning services in Kenya.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="main-content">
          {children}
        </main>
        <Footer />
        <Analytics /> {/* Added this line */}
      </body>
    </html>
  );
}