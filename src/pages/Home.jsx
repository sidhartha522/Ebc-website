import { useEffect } from 'react';
import { useAnimateOnScroll } from '../hooks/useInView';
import { useJsonData, useSettings } from '../hooks/useJsonData';
import Hero from '../components/home/Hero';
import Stats from '../components/home/Stats';
import WhyJoin from '../components/home/WhyJoin';
import WhoIsFor from '../components/home/WhoIsFor';
import Stories from '../components/home/Stories';
import UpcomingEvents from '../components/home/UpcomingEvents';
import JoinCTA from '../components/home/JoinCTA';
import Founder from '../components/home/Founder';
import './Home.css';

export default function Home() {
  const { data: settings } = useSettings();
  const { data: events } = useJsonData('events.json');
  const { data: stories } = useJsonData('stories.json');
  
  useAnimateOnScroll([events, stories]);

  useEffect(() => {
    document.title = 'EBC — Ekthaa Business & Builders Community | Hyderabad';
  }, []);

  return (
    <main className="home-page">
      <Hero />
      <Stats settings={settings} />
      <WhyJoin />
      <WhoIsFor />
      {stories && stories.length > 0 && <Stories stories={stories} />}
      {events && <UpcomingEvents events={events.filter(e => e.status === 'upcoming').slice(0, 3)} />}
      <JoinCTA />
      <Founder settings={settings} />
    </main>
  );
}
