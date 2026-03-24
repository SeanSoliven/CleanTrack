import React, { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from './firebase';
import './App.css';
import BottomNav from './components/shared/BottomNav';
import StartupPage from './pages/StartupPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import ReportPage from './pages/ReportPage';
import ActivitiesPage from './pages/ActivitiesPage';
import ProfilePage from './pages/ProfilePage';
import EditProfilePage from './pages/EditProfilePage';
import ChangePasswordPage from './pages/ChangePasswordPage';
import NotificationsPage from './pages/NotificationsPage';
import MyAddressPage from './pages/MyAddressPage';
import MyReportsPage from './pages/MyReportsPage';
import HelpPage from './pages/HelpPage';
import AboutPage from './pages/AboutPage';

function App() {
  const [screen, setScreen] = useState('startup');
  const [user, setUser] = useState(null);

  const navigate = (to) => setScreen(to);

  const onLogin = (userData) => {
    setUser(userData);
    navigate('home');
  };

  const onLogout = async () => {
    await signOut(auth);
    setUser(null);
    navigate('startup');
  };

  const showNav = ['home', 'report', 'activities', 'profile'].includes(screen);

  return (
    <div className="shell">
      <div className={showNav ? 'page' : 'page-full'} style={{ flex: 1, overflowY: 'auto' }}>
        {screen === 'startup' && <StartupPage onNavigate={navigate} />}
        {screen === 'login' && <LoginPage onNavigate={navigate} onLogin={onLogin} />}
        {screen === 'register' && <RegisterPage onNavigate={navigate} onLogin={onLogin} />}
        {screen === 'home' && <HomePage onNavigate={navigate} user={user} />}
        {screen === 'report' && <ReportPage onNavigate={navigate} />}
        {screen === 'activities' && <ActivitiesPage />}
        {screen === 'profile' && <ProfilePage user={user} onLogout={onLogout} onNavigate={navigate} />}
        {screen === 'edit-profile' && <EditProfilePage user={user} onNavigate={navigate} onUpdateUser={(u) => setUser(u)} />}
        {screen === 'change-password' && <ChangePasswordPage onNavigate={navigate} />}
        {screen === 'notifications' && <NotificationsPage onNavigate={navigate} />}
        {screen === 'my-address' && <MyAddressPage onNavigate={navigate} />}
        {screen === 'my-reports' && <MyReportsPage onNavigate={navigate} />}
        {screen === 'help' && <HelpPage onNavigate={navigate} />}
        {screen === 'about' && <AboutPage onNavigate={navigate} />}
      </div>
      {showNav && <BottomNav currentScreen={screen} onNavigate={navigate} />}
    </div>
  );
}

export default App;