// src/features/pronunciation/components/ComparisonTabs.tsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SpectrogramTab } from "./SpectrogramTab.tsx";
import { PitchContourTab } from "./PitchContourTab.tsx";
import { WaveformTab } from "./WaveformTab.tsx";
import * as styles from "./ResultsStage.css";

type TabType = "spectrogram" | "pitch" | "waveform";

interface ComparisonTabsProps {
  userAudioUrl: string | null;
}
export function ComparisonTabs({ userAudioUrl }: ComparisonTabsProps) {
  const [activeTab, setActiveTab] = useState<TabType>("spectrogram");

  const tabs = [
    { id: "spectrogram", label: "스펙트로그램", icon: "📊" },
    { id: "pitch", label: "음정 곡선", icon: "📈" },
    { id: "waveform", label: "파형 비교", icon: "🌊" },
  ] as const;

  const getTabIndicatorStyle = () => {
    const activeIndex = tabs.findIndex((tab) => tab.id === activeTab);
    const width = `calc(33.33% - 3.33px)`;
    const left = `calc(${activeIndex * 33.33}% + 5px)`;

    let background = "linear-gradient(135deg, #d4668f, #ff8fab)";
    if (activeTab === "pitch") {
      background = "linear-gradient(135deg, #9b7eb0, #b9a0c9)";
    } else if (activeTab === "waveform") {
      background = "linear-gradient(135deg, #6b7fa6, #8ca3c4)";
    }

    return {
      width,
      left,
      background,
    };
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "spectrogram":
        return <SpectrogramTab userAudioUrl={userAudioUrl} />;
      case "pitch":
        return <PitchContourTab userAudioUrl={userAudioUrl} />;
      case "waveform":
        return <WaveformTab userAudioUrl={userAudioUrl} />;
      default:
        return <SpectrogramTab userAudioUrl={userAudioUrl} />;
    }
  };

  return (
    <div className={styles.tabsContainer}>
      {/* 탭 헤더 */}
      <div className={styles.tabsHeader}>
        <div className={styles.tabIndicator} style={getTabIndicatorStyle()} />
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            className={`${styles.tabButton} ${
              activeTab === tab.id ? styles.tabButtonActive : ""
            }`}
            onClick={() => setActiveTab(tab.id as TabType)}
          >
            <span className={styles.tabIcon}>{tab.icon}</span>
            <span className={styles.tabLabel}>{tab.label}</span>
          </motion.button>
        ))}
      </div>

      {/* 탭 콘텐츠 */}
      <div className={styles.tabContent}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderTabContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
