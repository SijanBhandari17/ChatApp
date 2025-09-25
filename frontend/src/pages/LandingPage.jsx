import { Footer } from '@/components/Footer';
import Features from '../components/Features';
import Header from '../components/Header';
import Hero from '../components/Hero';

const LandingPage = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main>
        <Hero />
        <Features />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
