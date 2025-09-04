import React from "react";
import { Link } from "react-router-dom";
import useSpeechToText from "./hooks/useSpeechToText"; // Custom Hook 임포트
import "./AboutPage.css"; // About 페이지 CSS 임포트

function AboutPage() {
  // Custom Hook 사용
  const {
    transcript,
    listening,
    startListening,
    stopListening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechToText();

  // 브라우저가 음성 인식을 지원하지 않는 경우
  if (!browserSupportsSpeechRecognition) {
    return (
      <div className="page-container about-page">
        <div className="page-content">
          <h2>브라우저 지원 오류</h2>
          <p>
            죄송하지만, 현재 사용하고 계신 브라우저는 음성 인식을 지원하지
            않습니다.
            <br />
            Chrome, Edge, Safari 등 최신 브라우저를 이용해 주세요.
          </p>
          <Link to="/" className="home-button">
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container about-page">
      <div className="page-content">
        <h2>Web Speech API 소개</h2>
        <p>
          Web Speech API는 웹 페이지에서 음성 데이터를 인식하고 합성하는 기능을
          제공하는 JavaScript API입니다. 이 API는 크게{" "}
          <strong>Speech Recognition(음성 인식)</strong>과{" "}
          <strong>Speech Synthesis(음성 합성)</strong>으로 나뉩니다.
        </p>
        <h3>음성 인식 (Speech Recognition)</h3>
        <p>
          사용자의 음성 입력을 텍스트로 변환하는 기능입니다. 이 페이지에서는{" "}
          <code>react-speech-recognition</code> 라이브러리를 사용하여 사용자가
          말하는 것을 실시간으로 텍스트로 변환하는 기능을 구현했습니다.
        </p>

        {/* 음성 인식 데모 섹션 */}
        <div className="speech-demo-container">
          <h3>음성 인식 테스트</h3>
          <p>아래 버튼을 누르고 마이크에 대고 말해보세요.</p>
          <div className="transcript-box">
            <textarea
              className="transcript-textarea"
              value={transcript}
              readOnly
              placeholder="음성 인식 결과가 여기에 표시됩니다..."
            />
            {listening && <div className="listening-indicator"></div>}
          </div>
          <div className="button-group">
            <button
              onClick={listening ? stopListening : startListening}
              className={`speech-button ${listening ? "stop" : "start"}`}
            >
              {listening ? "음성인식 중지" : "음성인식 시작"}
            </button>
            <button onClick={resetTranscript} className="speech-button reset">
              초기화
            </button>
          </div>
        </div>

        <Link to="/" className="home-button">
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
}

export default AboutPage;
