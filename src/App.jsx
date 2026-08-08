import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import AccountSummary from './AccountSummary';
import { profiles } from './profileData';

export default function App() {
  const [currentProfile, setCurrentProfile] = useState(profiles.alex);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Login onSelectProfile={(p) => setCurrentProfile(p)} />}
        />
        <Route
          path="/account/:profile"
          element={
            <AccountSummary
              currentProfile={currentProfile}
              onLogout={() => setCurrentProfile(profiles.alex)}
            />
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
