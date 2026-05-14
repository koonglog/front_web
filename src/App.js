import React from 'react'
import { Route, Routes } from 'react-router-dom'
import RootLayout from './layouts/RootLayout';
import Home from './pages/home/Home';
import Dashboard from './pages/dashboard/Dashboard';
import Distribution from './pages/distribution/Distribution';
import LogAnalysis from './pages/loganalysis/LogAnalysis';
import Review from './pages/review/Review';
import Notice from './pages/notice/Notice';
import ExtService from './pages/extservice/ExtService';
import MyPage from './pages/mypage/MyPage';
import Monitoring from './pages/dashboard/Monitoring';
import Emergency from './pages/dashboard/Emergency';
import TodayTotal from './pages/dashboard/TodayTotal';

const App = () => {
	return (
		<Routes>
			<Route path="/" element={<RootLayout />}>
				<Route index element={<Home />} />
				<Route path="dashboard" element={<Dashboard />} />
				<Route path="dashboard/monitoring" element={<Monitoring />} />
				<Route path="dashboard/emergency" element={<Emergency />} />
				<Route path="dashboard/todayTotal" element={<TodayTotal />} />
				<Route path="distribution" element={<Distribution />} />
				<Route path="log-analysis" element={<LogAnalysis />} />
				<Route path="review" element={<Review />} />
				<Route path="notice" element={<Notice />} />
				<Route path="external-service" element={<ExtService />} />
				<Route path="mypage" element={<MyPage />} />
			</Route>
		</Routes>
	);
}

export default App
