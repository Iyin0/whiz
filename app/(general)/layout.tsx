import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

export default function GeneralLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-transparent relative">
      <Header />
      {children}
      <Footer />
    </div>
  );
}