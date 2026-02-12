
import React, { useState, useMemo } from 'react';
import { SPIRITUAL_GIFTS, MINISTRIES } from './constants';
import { suggestMinistryFits } from './services/matchingLogic';
import { UserProfile, MatchResult } from './types';

const App: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    contact: '',
    strengths: '',
    selectedGifts: []
  });

  const [activeTab, setActiveTab] = useState<'home' | 'assess' | 'matches' | 'profile'>('home');

  const matches = useMemo(() => {
    if (profile.selectedGifts.length === 0) return [];
    return suggestMinistryFits(profile.selectedGifts, MINISTRIES);
  }, [profile.selectedGifts]);

  const toggleGift = (giftId: string) => {
    setProfile(prev => {
      const isSelected = prev.selectedGifts.includes(giftId);
      if (isSelected) {
        return { ...prev, selectedGifts: prev.selectedGifts.filter(id => id !== giftId) };
      } else {
        return { ...prev, selectedGifts: [...prev.selectedGifts, giftId] };
      }
    });
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <>
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-gradient-to-br from-white to-blue-50 px-6 py-10 border-b border-blue-100">
              <div className="absolute -right-10 -top-10 text-primary opacity-5">
                <span className="material-symbols-outlined text-[200px]">auto_awesome</span>
              </div>
              <div className="relative z-10 flex flex-col gap-4">
                <div className="space-y-1">
                  <h1 className="text-slate-900 text-3xl font-black leading-tight tracking-tight">
                    Discover Your God-given <span className="text-primary">SHAPE</span>
                  </h1>
                  <h2 className="text-primary text-xl font-bold chinese-text">发现上帝赐予你的SHAPE</h2>
                </div>
                <div className="space-y-1 opacity-80">
                  <p className="text-slate-600 text-sm font-medium">Rooted in Truth, Committed to Discipleship</p>
                  <p className="text-slate-500 text-xs chinese-text">扎根真理，委身门徒</p>
                </div>
                <button 
                  onClick={() => setActiveTab('assess')}
                  className="mt-4 flex w-fit items-center justify-center rounded-lg bg-primary px-6 py-3 text-white text-sm font-bold shadow-lg shadow-primary/30 active:scale-95 transition-all"
                >
                  Start Discovery / 开始发现之旅
                </button>
              </div>
            </div>

            {/* SHAPE Categories Grid */}
            <div className="p-6">
              <h3 className="text-slate-900 text-lg font-bold mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-accent-gold">grid_view</span>
                SHAPE Categories / 类别
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="group flex flex-col gap-3 rounded-xl border-2 border-accent-gold/20 bg-white p-4 shadow-sm hover:border-accent-gold/50 transition-colors cursor-pointer">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-gold/10 text-accent-gold">
                    <span className="material-symbols-outlined">auto_fix_high</span>
                  </div>
                  <div>
                    <p className="text-slate-900 font-bold text-sm">Spiritual Gifts</p>
                    <p className="text-slate-500 text-[10px] chinese-text font-medium">属灵恩赐</p>
                  </div>
                </div>
                <div className="group flex flex-col gap-3 rounded-xl border-2 border-accent-gold/20 bg-white p-4 shadow-sm hover:border-accent-gold/50 transition-colors cursor-pointer">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-gold/10 text-accent-gold">
                    <span className="material-symbols-outlined">favorite</span>
                  </div>
                  <div>
                    <p className="text-slate-900 font-bold text-sm">Heart</p>
                    <p className="text-slate-500 text-[10px] chinese-text font-medium">心志</p>
                  </div>
                </div>
                <div className="group flex flex-col gap-3 rounded-xl border-2 border-accent-gold/20 bg-white p-4 shadow-sm hover:border-accent-gold/50 transition-colors cursor-pointer">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-gold/10 text-accent-gold">
                    <span className="material-symbols-outlined">psychology</span>
                  </div>
                  <div>
                    <p className="text-slate-900 font-bold text-sm">Abilities</p>
                    <p className="text-slate-500 text-[10px] chinese-text font-medium">才干</p>
                  </div>
                </div>
                <div className="group flex flex-col gap-3 rounded-xl border-2 border-accent-gold/20 bg-white p-4 shadow-sm hover:border-accent-gold/50 transition-colors cursor-pointer">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-gold/10 text-accent-gold">
                    <span className="material-symbols-outlined">face_retouching_natural</span>
                  </div>
                  <div>
                    <p className="text-slate-900 font-bold text-sm">Personality</p>
                    <p className="text-slate-500 text-[10px] chinese-text font-medium">性格</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Quick Summary of Matches */}
            {matches.length > 0 && (
              <div className="px-6 pb-24">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-slate-900 text-lg font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">analytics</span>
                    Top Matches / 事工匹配
                  </h3>
                  <button onClick={() => setActiveTab('matches')} className="text-primary text-xs font-bold">See All</button>
                </div>
                <div className="space-y-3">
                  {matches.slice(0, 3).map((match) => (
                    <MatchCard key={match.ministry.id} match={match} />
                  ))}
                </div>
              </div>
            )}
          </>
        );
      case 'assess':
        return (
          <div className="p-6 pb-24 space-y-8">
            <header className="flex items-center justify-between">
              <h3 className="text-slate-900 text-xl font-bold">Assessment / <span className="chinese-text">评估表</span></h3>
              <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded">Step 1 of 3</span>
            </header>
            
            <section className="space-y-4">
              <h4 className="text-slate-800 font-bold text-md border-b pb-2">Select Your Spiritual Gifts</h4>
              <p className="text-slate-500 text-sm">Choose the gifts you believe God has granted you.</p>
              <div className="grid grid-cols-2 gap-3">
                {SPIRITUAL_GIFTS.map(gift => (
                  <button
                    key={gift.id}
                    onClick={() => toggleGift(gift.id)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      profile.selectedGifts.includes(gift.id)
                        ? 'bg-primary border-primary text-white shadow-md'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-primary/50'
                    }`}
                  >
                    <p className="text-xs font-bold leading-tight">{gift.name}</p>
                    <p className={`text-[10px] chinese-text ${profile.selectedGifts.includes(gift.id) ? 'text-blue-100' : 'text-slate-400'}`}>
                      {gift.nameZh}
                    </p>
                  </button>
                ))}
              </div>
            </section>

            <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); setActiveTab('matches'); }}>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-slate-500 flex justify-between uppercase">
                  NAME <span className="chinese-text text-[10px]">姓名</span>
                </label>
                <input 
                  className="w-full rounded-lg border-slate-200 bg-white text-sm focus:border-primary focus:ring-primary" 
                  placeholder="Your full name" 
                  type="text"
                  value={profile.name}
                  onChange={e => setProfile({...profile, name: e.target.value})}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-slate-500 flex justify-between uppercase">
                  CONTACT <span className="chinese-text text-[10px]">联系方式</span>
                </label>
                <input 
                  className="w-full rounded-lg border-slate-200 bg-white text-sm focus:border-primary focus:ring-primary" 
                  placeholder="Email or Phone number" 
                  type="text"
                  value={profile.contact}
                  onChange={e => setProfile({...profile, contact: e.target.value})}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-slate-500 flex justify-between uppercase">
                  STRENGTHS <span className="chinese-text text-[10px]">优势</span>
                </label>
                <textarea 
                  className="w-full rounded-lg border-slate-200 bg-white text-sm focus:border-primary focus:ring-primary" 
                  placeholder="Describe your natural talents..." 
                  rows={3}
                  value={profile.strengths}
                  onChange={e => setProfile({...profile, strengths: e.target.value})}
                ></textarea>
              </div>
              <button className="w-full bg-primary text-white font-bold py-4 rounded-lg shadow-xl shadow-primary/20 active:scale-95 transition-transform">
                View My Matches / 查看我的匹配
              </button>
            </form>
          </div>
        );
      case 'matches':
        return (
          <div className="p-6 pb-24">
            <h3 className="text-slate-900 text-xl font-bold mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">auto_graph</span>
              Ministry Matching / 事工匹配
            </h3>
            
            {matches.length > 0 ? (
              <div className="space-y-4">
                {matches.map((match) => (
                  <MatchCard key={match.ministry.id} match={match} expanded />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-300">
                  <span className="material-symbols-outlined text-4xl">search</span>
                </div>
                <p className="text-slate-500 font-medium">No gifts selected yet.<br/>Start the assessment to see your matches!</p>
                <button 
                  onClick={() => setActiveTab('assess')}
                  className="text-primary font-bold underline"
                >
                  Start Assessment
                </button>
              </div>
            )}
          </div>
        );
      case 'profile':
        return (
          <div className="p-6 pb-24 text-center">
            <div className="w-24 h-24 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center text-primary">
               <span className="material-symbols-outlined text-5xl">person</span>
            </div>
            <h3 className="text-slate-900 text-xl font-bold">{profile.name || 'Guest User'}</h3>
            <p className="text-slate-500 text-sm mb-8">{profile.contact || 'No contact provided'}</p>
            
            <div className="bg-white border rounded-xl p-4 text-left space-y-4 shadow-sm">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Selected Gifts</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {profile.selectedGifts.length > 0 ? (
                    profile.selectedGifts.map(id => {
                      const g = SPIRITUAL_GIFTS.find(sg => sg.id === id);
                      return <span key={id} className="bg-slate-100 px-2 py-1 rounded text-xs font-bold text-slate-600">{g?.name}</span>;
                    })
                  ) : <p className="text-xs text-slate-400">None selected</p>}
                </div>
              </div>
              <button 
                onClick={() => {
                  setProfile({ name: '', contact: '', strengths: '', selectedGifts: [] });
                  setActiveTab('assess');
                }}
                className="w-full py-2 text-red-500 text-xs font-bold border border-red-100 rounded-lg hover:bg-red-50"
              >
                Reset Discovery
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden max-w-md mx-auto bg-white shadow-2xl">
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center bg-white/90 backdrop-blur-md px-4 py-4 justify-between border-b border-gray-100">
        <div className="text-primary flex size-10 shrink-0 items-center justify-center">
          <span className="material-symbols-outlined text-3xl">church</span>
        </div>
        <h2 className="text-slate-900 text-lg font-bold leading-tight tracking-tight flex-1 ml-3">
          SHAPE Portal <br />
          <span className="text-sm font-medium text-slate-500 chinese-text">发现中心</span>
        </h2>
        <div className="flex items-center justify-end bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
          <p className="text-primary text-xs font-bold leading-normal tracking-wider">EN / 中</p>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-background-light">
        {renderContent()}
      </main>

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md border-t border-slate-100 bg-white/95 backdrop-blur-md px-4 pb-4 pt-2 flex items-center justify-around z-50">
        <NavItem 
          active={activeTab === 'home'} 
          icon="home" 
          label="Home" 
          onClick={() => setActiveTab('home')} 
        />
        <NavItem 
          active={activeTab === 'assess'} 
          icon="assignment" 
          label="Assess" 
          onClick={() => setActiveTab('assess')} 
        />
        <NavItem 
          active={activeTab === 'matches'} 
          icon="diversity_3" 
          label="Matches" 
          onClick={() => setActiveTab('matches')} 
        />
        <NavItem 
          active={activeTab === 'profile'} 
          icon="person" 
          label="Profile" 
          onClick={() => setActiveTab('profile')} 
        />
      </nav>
    </div>
  );
};

// Internal Components
const NavItem: React.FC<{ active: boolean; icon: string; label: string; onClick: () => void }> = ({ active, icon, label, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center gap-1 transition-colors ${active ? 'text-primary' : 'text-slate-400 hover:text-slate-600'}`}
  >
    <span className="material-symbols-outlined">{icon}</span>
    <p className="text-[10px] font-bold">{label}</p>
  </button>
);

const MatchCard: React.FC<{ match: MatchResult; expanded?: boolean }> = ({ match, expanded }) => {
  const getProgressColor = (percent: number) => {
    if (percent >= 90) return 'bg-green-500';
    if (percent >= 70) return 'bg-blue-500';
    if (percent >= 50) return 'bg-amber-500';
    return 'bg-slate-400';
  };

  const getTagColor = (percent: number) => {
    if (percent >= 90) return 'bg-green-100 text-green-700';
    if (percent >= 70) return 'bg-blue-100 text-blue-700';
    if (percent >= 50) return 'bg-amber-100 text-amber-700';
    return 'bg-slate-100 text-slate-700';
  };

  return (
    <div className="group flex flex-col p-4 bg-white border border-slate-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-2">
        <div className="flex gap-3 items-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
            <span className="material-symbols-outlined">{match.ministry.icon}</span>
          </div>
          <div>
            <p className="text-slate-900 font-bold text-sm">{match.ministry.name}</p>
            <p className="text-slate-500 text-xs chinese-text">{match.ministry.nameZh}</p>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <span className={`${getTagColor(match.percentage)} text-[10px] font-black px-2 py-0.5 rounded-full`}>
            {match.percentage}% MATCH
          </span>
          <div className="w-16 h-1 bg-slate-100 mt-2 rounded-full overflow-hidden">
            <div className={`h-full ${getProgressColor(match.percentage)}`} style={{ width: `${match.percentage}%` }}></div>
          </div>
        </div>
      </div>
      {expanded && (
        <div className="mt-2 text-xs text-slate-500 leading-relaxed border-t pt-3 border-slate-50">
          <p className="font-medium mb-1">Key Gifts:</p>
          <div className="flex flex-wrap gap-1">
            {match.ministry.primaryGifts.map(id => {
              const g = SPIRITUAL_GIFTS.find(sg => sg.id === id);
              return <span key={id} className="px-2 py-0.5 bg-slate-50 border rounded text-[10px]">{g?.name}</span>;
            })}
          </div>
          <p className="mt-3 italic text-[11px] text-slate-400">{match.ministry.description}</p>
        </div>
      )}
    </div>
  );
};

export default App;
