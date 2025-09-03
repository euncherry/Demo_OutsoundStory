// src/features/pronunciation/components/ComparisonTabs.tsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SpectrogramTab } from "./SpectrogramTab.tsx";
import { PitchContourTab } from "./PitchContourTab.tsx";
import { WaveformTab } from "./WaveformTab.tsx";
import * as styles from "./ResultsStage.css.ts";

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
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            className={`${styles.tabButton} ${
              activeTab === tab.id ? styles.tabButtonActive : ""
            }`}
            onClick={() => setActiveTab(tab.id as TabType)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
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
