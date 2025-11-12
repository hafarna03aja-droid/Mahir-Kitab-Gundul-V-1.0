import React from 'react';
import type { TabId } from '../types';
import { BookOpenIcon, ChatBubbleLeftRightIcon, MicrophoneIcon, QueueListIcon } from './icons/TabIcons';

interface TabsProps {
    activeTab: TabId;
    setActiveTab: (tab: TabId) => void;
}

const Tabs: React.FC<TabsProps> = ({ activeTab, setActiveTab }) => {
    const tabs = [
        { id: 'analisis' as TabId, label: 'Analisis', shortLabel: 'Analisis', icon: <BookOpenIcon className="w-4 h-4 sm:w-5 sm:h-5 sm:mr-2" /> },
        { id: 'kitab' as TabId, label: 'Kitab 9 Ulama', shortLabel: 'Kitab', icon: <QueueListIcon className="w-4 h-4 sm:w-5 sm:h-5 sm:mr-2" /> },
        { id: 'asisten' as TabId, label: 'Asisten Cerdas', shortLabel: 'Asisten', icon: <ChatBubbleLeftRightIcon className="w-4 h-4 sm:w-5 sm:h-5 sm:mr-2" /> },
        { id: 'tutor' as TabId, label: 'Tutor Langsung', shortLabel: 'Tutor', icon: <MicrophoneIcon className="w-4 h-4 sm:w-5 sm:h-5 sm:mr-2" /> },
    ];

    return (
        <div className="border-b border-slate-700 overflow-x-auto">
            <nav className="-mb-px flex space-x-2 sm:space-x-6" aria-label="Tabs">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`
                            ${activeTab === tab.id
                                ? 'border-amber-400 text-amber-400'
                                : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-500'
                            }
                            whitespace-nowrap py-3 sm:py-4 px-2 sm:px-1 border-b-2 font-medium text-xs sm:text-sm flex items-center transition-all duration-200
                        `}
                    >
                        {tab.icon}
                        <span className="hidden sm:inline">{tab.label}</span>
                        <span className="sm:hidden">{tab.shortLabel}</span>
                    </button>
                ))}
            </nav>
        </div>
    );
};

export default Tabs;