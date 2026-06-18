import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Events from './pages/Events';
import EventDetail from './pages/EventDetail';
import Opportunities from './pages/Opportunities';
import JoinCommunity from './pages/JoinCommunity';
import About from './pages/About';
import Admin from './pages/Admin';
import AmbientBackground from './components/common/AmbientBackground';

const routeElements = [
  { path: '/', element: <Home /> },
  { path: '/events', element: <Events /> },
  { path: '/events/:id', element: <EventDetail /> },
  { path: '/opportunities', element: <Opportunities /> },
  { path: '/oppurtinities', element: <Opportunities /> },
  { path: '/join', element: <JoinCommunity /> },
  { path: '/about', element: <About /> },
  { path: '/admin', element: <Admin /> },
];

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppLayout() {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith('/admin');

  return (
    <>
      <AmbientBackground />
      <Navbar />
      <ScrollToTop />
      <Routes>
        {routeElements.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
      {!isAdmin && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}
