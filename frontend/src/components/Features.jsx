import { MessageCircle, Share2, Shield, Upload, Users, Video, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const features = [
  {
    icon: MessageCircle,
    title: 'Instant Messaging',
    description:
      'Send and receive messages instantly with real-time delivery notifications and typing indicators for seamless conversations.',
  },
  {
    icon: Video,
    title: 'HD Video & Audio Calls',
    description:
      'Crystal-clear video and audio quality with adaptive streaming that adjusts to your connection for the best experience.',
  },
  {
    icon: Users,
    title: 'Group Chat & Calls',
    description:
      'Connect with multiple people simultaneously through group chats and video conferences that support up to 50 participants.',
  },
  {
    icon: Share2,
    title: 'Screen Sharing',
    description:
      'Share your screen effortlessly during video calls for presentations, collaboration, or troubleshooting sessions.',
  },
  {
    icon: Upload,
    title: 'File Sharing',
    description:
      'Send documents, images, and files up to 100MB with drag-and-drop simplicity and automatic cloud backup.',
  },
  {
    icon: Shield,
    title: 'End-to-End Security',
    description:
      'Your conversations are protected with military-grade encryption and advanced privacy controls you can trust.',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description:
      'Optimized performance ensures minimal latency and instant loading, even on slower internet connections.',
  },
];

const Features = () => {
  return (
    <section className="bg-muted/60 px-4 py-20" id="features">
      <div className="container mx-auto">
        <div className="mb-12 flex flex-col text-center">
          <h1 className="mb-3 text-4xl">Everything You Need to Stay Connected</h1>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            Our comprehensive suite of communication tools ensures you never miss a moment, whether
            you're catching up with friends or collaborating with colleagues.
          </p>
        </div>
        <div className="grid grid-cols-4 grid-rows-2 gap-6">
          {features.map((item, index) => {
            return (
              <Card key={index}>
                <CardHeader>
                  <item.icon />
                  <CardTitle className="text-lg font-light">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
