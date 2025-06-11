// components/Dashboard.jsx
import { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Brain, 
  Zap, 
  TrendingUp, 
  Calendar,
  Plus,
  Play,
  Star,
  Clock,
  Target
} from 'lucide-react';
import { useAuth } from '../App';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalDecks: 12,
    totalCards: 247,
    studiedToday: 23,
    currentStreak: 7,
    weeklyGoal: 50,
    weeklyProgress: 32
  });

  const [recentActivity, setRecentActivity] = useState([
    { id: 1, action: 'Studied', deck: 'Spanish Vocabulary', cards: 15, time: '2 hours ago' },
    { id: 2, action: 'Created', deck: 'React Hooks', cards: 8, time: '4 hours ago' },
    { id: 3, action: 'Reviewed', deck: 'History Facts', cards: 12, time: 'Yesterday' },
    { id: 4, action: 'Completed', deck: 'Math Formulas', cards: 20, time: 'Yesterday' },
  ]);

  const [upcomingReviews, setUpcomingReviews] = useState([
    { id: 1, deck: 'Japanese Kanji', dueCards: 8, priority: 'high' },
    { id: 2, deck: 'Biology Terms', dueCards: 15, priority: 'medium' },
    { id: 3, deck: 'Programming Concepts', dueCards: 5, priority: 'low' },
  ]);

  const containerStyle = {
    padding: '2rem',
    maxWidth: '1200px',
    margin: '0 auto'
  };

  const headerStyle = {
    marginBottom: '2rem'
  };

  const titleStyle = {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#1f2937',
    margin: '0 0 0.5rem 0'
  };

  const subtitleStyle = {
    color: '#6b7280',
    fontSize: '1rem',
    margin: 0
  };

  const gridStyle = {
    display: 'grid',
    gap: '1.5rem',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    marginBottom: '2rem'
  };

  const cardStyle = {
    background: 'white',
    borderRadius: '1rem',
    padding: '1.5rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    border: '1px solid rgba(229, 231, 235, 0.5)'
  };

  const statCardStyle = {
    ...cardStyle,
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  };

  const iconWrapperStyle = (color) => ({
    width: '3rem',
    height: '3rem',
    borderRadius: '0.75rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: color
  });

  const statValueStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#1f2937',
    margin: 0
  };

  const statLabelStyle = {
    fontSize: '0.875rem',
    color: '#6b7280',
    margin: 0
  };

  const buttonStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    padding: '0.75rem 1.5rem',
    background: 'linear-gradient(to right, #4f46e5, #9333ea)',
    color: 'white',
    border: 'none',
    borderRadius: '0.5rem',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
    textDecoration: 'none'
  };

  const secondaryButtonStyle = {
    ...buttonStyle,
    background: 'white',
    color: '#4f46e5',
    border: '2px solid #4f46e5'
  };

  const progressBarStyle = {
    width: '100%',
    height: '0.5rem',
    background: '#e5e7eb',
    borderRadius: '0.25rem',
    overflow: 'hidden',
    margin: '0.5rem 0'
  };

  const progressFillStyle = (percentage) => ({
    height: '100%',
    width: `${percentage}%`,
    background: 'linear-gradient(to right, #4f46e5, #9333ea)',
    transition: 'width 0.3s ease'
  });

  return (
    <div style={containerStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <h1 style={titleStyle}>
          Welcome back, {user?.username || 'Learner'}! 🧠
        </h1>
        <p style={subtitleStyle}>
          Ready to strengthen your memory? Let's dive into today's learning session.
        </p>
      </div>

      {/* Stats Grid */}
      <div style={gridStyle}>
        <div style={statCardStyle}>
          <div style={iconWrapperStyle('linear-gradient(135deg, #ddd6fe, #c4b5fd)')}>
            <BookOpen className="w-6 h-6" style={{ color: '#7c3aed' }} />
          </div>
          <div>
            <p style={statValueStyle}>{stats.totalDecks}</p>
            <p style={statLabelStyle}>Total Decks</p>
          </div>
        </div>

        <div style={statCardStyle}>
          <div style={iconWrapperStyle('linear-gradient(135deg, #fef3c7, #fde68a)')}>
            <Brain className="w-6 h-6" style={{ color: '#d97706' }} />
          </div>
          <div>
            <p style={statValueStyle}>{stats.totalCards}</p>
            <p style={statLabelStyle}>Total Cards</p>
          </div>
        </div>

        <div style={statCardStyle}>
          <div style={iconWrapperStyle('linear-gradient(135deg, #dcfce7, #bbf7d0)')}>
            <Zap className="w-6 h-6" style={{ color: '#16a34a' }} />
          </div>
          <div>
            <p style={statValueStyle}>{stats.studiedToday}</p>
            <p style={statLabelStyle}>Cards Today</p>
          </div>
        </div>

        <div style={statCardStyle}>
          <div style={iconWrapperStyle('linear-gradient(135deg, #fce7f3, #fbcfe8)')}>
            <TrendingUp className="w-6 h-6" style={{ color: '#e11d48' }} />
          </div>
          <div>
            <p style={statValueStyle}>{stats.currentStreak}</p>
            <p style={statLabelStyle}>Day Streak</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{
        display: 'flex',
        gap: '1rem',
        marginBottom: '2rem',
        flexWrap: 'wrap'
      }}>
        <button style={buttonStyle}>
          <Play className="w-5 h-5" />
          Start Studying
        </button>
        <button style={secondaryButtonStyle}>
          <Plus className="w-5 h-5" />
          Create New Deck
        </button>
      </div>

      {/* Weekly Goal Progress */}
      <div style={{
        ...cardStyle,
        marginBottom: '2rem'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1rem'
        }}>
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: '600',
            color: '#1f2937',
            margin: 0,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <Target className="w-5 h-5" style={{ color: '#4f46e5' }} />
            Weekly Goal
          </h3>
          <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
            {stats.weeklyProgress} / {stats.weeklyGoal} cards
          </span>
        </div>
        <div style={progressBarStyle}>
          <div style={progressFillStyle((stats.weeklyProgress / stats.weeklyGoal) * 100)} />
        </div>
        <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: '0.5rem 0 0 0' }}>
          {stats.weeklyGoal - stats.weeklyProgress} cards left to reach your weekly goal!
        </p>
      </div>

      {/* Main Content Grid */}
      <div style={{
        display: 'grid',
        gap: '1.5rem',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))'
      }}>
        {/* Upcoming Reviews */}
        <div style={cardStyle}>
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: '600',
            color: '#1f2937',
            margin: '0 0 1rem 0',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <Clock className="w-5 h-5" style={{ color: '#f59e0b' }} />
            Due for Review
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {upcomingReviews.map((review) => (
              <div key={review.id} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.75rem',
                background: '#f9fafb',
                borderRadius: '0.5rem',
                border: '1px solid #e5e7eb'
              }}>
                <div>
                  <p style={{
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: '#1f2937',
                    margin: 0
                  }}>
                    {review.deck}
                  </p>
                  <p style={{
                    fontSize: '0.75rem',
                    color: '#6b7280',
                    margin: 0
                  }}>
                    {review.dueCards} cards due
                  </p>
                </div>
                <div style={{
                  padding: '0.25rem 0.5rem',
                  borderRadius: '0.25rem',
                  fontSize: '0.75rem',
                  fontWeight: '500',
                  background: review.priority === 'high' ? '#fef2f2' : 
                             review.priority === 'medium' ? '#fffbeb' : '#f0f9ff',
                  color: review.priority === 'high' ? '#dc2626' : 
                         review.priority === 'medium' ? '#d97706' : '#2563eb'
                }}>
                  {review.priority} priority
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div style={cardStyle}>
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: '600',
            color: '#1f2937',
            margin: '0 0 1rem 0',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <Calendar className="w-5 h-5" style={{ color: '#10b981' }} />
            Recent Activity
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {recentActivity.map((activity) => (
              <div key={activity.id} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem',
                background: '#f9fafb',
                borderRadius: '0.5rem',
                border: '1px solid #e5e7eb'
              }}>
                <div style={{
                  width: '2rem',
                  height: '2rem',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'linear-gradient(135deg, #4f46e5, #9333ea)'
                }}>
                  <Star className="w-3 h-3" style={{ color: 'white' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: '#1f2937',
                    margin: 0
                  }}>
                    {activity.action} "{activity.deck}"
                  </p>
                  <p style={{
                    fontSize: '0.75rem',
                    color: '#6b7280',
                    margin: 0
                  }}>
                    {activity.cards} cards • {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

