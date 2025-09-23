import { Button } from './ui/button';

const Hero = () => {
  return (
    <section className="px-4 py-20">
      <div className="container mx-auto max-w-4xl text-center">
        <div className="mb-6">
          <h1 className="text-6xl tracking-tight">Connect Instantly, Communicate Seamlessly</h1>
        </div>
        <div>
          <p className="text-muted-foreground mx-auto max-w-2xl text-center text-lg">
            Experience crystal-clear video calls and instant messaging in one powerful platform.
            Built for modern communication needs, whether for personal connections or professional
            collaboration.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
