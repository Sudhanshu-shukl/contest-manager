import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import UpcomingContests from './pages/UpcomingContests';
import PastContests from './pages/PastContests';
import apiService from './services/api';
import './styles/App.css';

function App() {
    const [contests, setContests] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [platformFilter, setPlatformFilter] = useState('All');

    useEffect(() => {
        loadContestsFromAPI();
    }, []);

    const loadContestsFromAPI = async () => {
        try {
            const loadedContests = await apiService.getContests();
            setContests(loadedContests);
        } catch (error) {
            console.error('Failed to load contests:', error);
            // Set empty array to prevent app crash
            setContests([]);
        }
    };

    const addContest = async (contestData) => {
        try {
            const newContest = await apiService.createContest(contestData);
            setContests(prevContests => [...prevContests, newContest]);
        } catch (error) {
            console.error('Failed to add contest:', error);
            // You could add a toast notification here
        }
    };

    const updateContest = async (id, updatedData) => {
        try {
            const updatedContest = await apiService.updateContest(id, updatedData);
            setContests(prevContests => 
                prevContests.map(contest => 
                    contest._id === id ? updatedContest : contest
                )
            );
        } catch (error) {
            console.error('Failed to update contest:', error);
            // You could add a toast notification here
        }
    };

    const deleteContest = async (id) => {
        try {
            await apiService.deleteContest(id);
            setContests(prevContests => prevContests.filter(contest => contest._id !== id));
        } catch (error) {
            console.error('Failed to delete contest:', error);
            // You could add a toast notification here
        }
    };

    const markAsDone = async (id, questionsSolved) => {
        try {
            const updatedContest = await apiService.markContestAsDone(id, questionsSolved);
            setContests(prevContests => 
                prevContests.map(contest => 
                    contest._id === id ? updatedContest : contest
                )
            );
        } catch (error) {
            console.error('Failed to mark contest as done:', error);
            // You could add a toast notification here
        }
    };

    const importContests = async (importedContests) => {
        try {
            const promises = importedContests.map(contest => 
                apiService.createContest(contest).catch(error => {
                    console.error('Failed to import contest:', contest.name, error);
                    return null;
                })
            );
            
            const results = await Promise.all(promises);
            const successfulImports = results.filter(result => result !== null);
            
            if (successfulImports.length > 0) {
                setContests(prevContests => [...prevContests, ...successfulImports]);
            }
        } catch (error) {
            console.error('Failed to import contests:', error);
            // You could add a toast notification here
        }
    };

    const exportContests = () => {
        const dataStr = JSON.stringify(contests, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
        const exportFileDefaultName = `contests_${new Date().toISOString().split('T')[0]}.json`;
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    };

    return (
        <Router>
            <div className="app">
                <Navigation
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    platformFilter={platformFilter}
                    setPlatformFilter={setPlatformFilter}
                    onExport={exportContests}
                    onImport={importContests}
                />
                <main className="main-content">
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <UpcomingContests
                                    contests={contests}
                                    searchTerm={searchTerm}
                                    platformFilter={platformFilter}
                                    onAddContest={addContest}
                                    onUpdateContest={updateContest}
                                    onDeleteContest={deleteContest}
                                    onMarkAsDone={markAsDone}
                                />
                            }
                        />
                        <Route
                            path="/past"
                            element={
                                <PastContests
                                    contests={contests}
                                    searchTerm={searchTerm}
                                    platformFilter={platformFilter}
                                />
                            }
                        />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;