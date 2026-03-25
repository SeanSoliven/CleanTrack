import React, { useState, useEffect } from 'react';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase';
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
import AdminPage from './pages/AdminPage';

function App() {
  const [screen, setScreen] = useState('startup');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  const navigate = (to) => setScreen(to);

  // Check Firebase auth state on app load
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser) {
          // User is logged in, fetch their data from Firestore
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          const role = userDoc.exists() ? userDoc.data().role : 'user';
          setUser({ email: firebaseUser.email, name: firebaseUser.email.split('@')[0], role });
          // Only auto-navigate on initial load
          if (!isInitialized) {
            navigate(role === 'admin' ? 'admin' : 'home');
            setIsInitialized(true);
          }
        } else {
          // User is logged out
          setUser(null);
          // Only navigate to startup on initial load (not during manual logout)
          if (!isInitialized) {
            setIsInitialized(true);
          }
        }
      } catch (error) {
        console.error('Error during auth state change:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [isInitialized]);

  const onLogin = (userData) => {
    setUser(userData);
    if (userData.role === 'admin') {
      navigate('admin');
    } else {
      navigate('home');
    }
  };

  const onLogout = async () => {
    await signOut(auth);
    setUser(null);
    navigate('login');
  };

  const showNav = ['home', 'report', 'activities', 'profile'].includes(screen);

  if (loading) {
    return <div className="shell"><div className="page-full" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div></div>;
  }

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
        {screen === 'admin' && <AdminPage user={user} onNavigate={navigate} onLogout={onLogout} />}
      </div>
      {showNav && <BottomNav currentScreen={screen} onNavigate={navigate} />}
    </div>
  );
}

export default App;