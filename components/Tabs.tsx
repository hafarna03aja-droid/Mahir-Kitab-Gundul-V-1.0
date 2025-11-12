import React from 'react';
import type { TabId } from '../types';
import { BookOpenIcon, ChatBubbleLeftRightIcon, MicrophoneIcon, QueueListIcon } from './icons/TabIcons';

interface TabsProps {
    activeTab: TabId;
    setActiveTab: (tab: TabId) => void;
}

const Tabs: React.FC<TabsProps> = ({ activeTab, setActiveTab }) => {
    const tabs = [
        { id: 'analisis' as TabId, label: 'Analisis', icon: <BookOpenIcon className="w-5 h-5 mr-2" /> },
        { id: 'kitab' as TabId, label: 'Kitab 9 Ulama', icon: <QueueListIcon className="w-5 h-5 mr-2" /> },
        { id: 'asisten' as TabId, label: 'Asisten Cerdas', icon: <ChatBubbleLeftRightIcon className="w-5 h-5 mr-2" /> },
        { id: 'tutor' as TabId, label: 'Tutor Langsung', icon: <MicrophoneIcon className="w-5 h-5 mr-2" /> },
    ];

    return (
        <div className="border-b border-slate-700">
            <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`
                            ${activeTab === tab.id
                                ? 'border-amber-400 text-amber-400'
                                : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-500'
                            }
                            whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center transition-all duration-200
                        `}
                    >
                        {tab.icon}
                        {tab.label}
                    </button>
                ))}
            </nav>
        </div>
    );
};

export default Tabs;