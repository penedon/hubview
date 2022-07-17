import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import ProfileHomeView from './views/profile/ProfileHomeView'
import RepositoryView from './views/repository/RepositoryView'
import SearchView from './views/search/SearchView'

const routes = [
    <Route path="/" 
           element={ <Navigate to="/search" /> } exact strict key="home"/>,
    <Route path="/search" element={<SearchView/>} exact strict key="search" />,
    <Route path="/profile/:username/" element={<ProfileHomeView/>} exact strict key="profile-home" />,
    <Route path="/profile/:username/:repository" element={<RepositoryView/>} exact strict key="repo-details" />
]

export default routes