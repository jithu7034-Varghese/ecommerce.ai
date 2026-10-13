'use client';

import React, { useState, useEffect } from 'react';
import { Mic, MicOff, AlertCircle } from 'lucide-react';

interface VoiceInputButtonProps {
  onTranscript: (text: string) => void;
}

export function VoiceInputButton({ onTranscript }: VoiceInputButtonProps) {
  const [isSupported, setIsSupported] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition =
        (window as unknown as { SpeechRecognition?: unknown; webkitSpeechRecognition?: unknown }).SpeechRecognition ||
        (window as unknown as { webkitSpeechRecognition?: unknown }).webkitSpeechRecognition;
      setIsSupported(!!SpeechRecognition);
    }
  }, []);

  const handleToggleVoice = () => {
    setErrorMessage(null);

    if (!isSupported) {
      setErrorMessage('Voice recognition is not supported in this browser. Please type your request below.');
      setTimeout(() => setErrorMessage(null), 5000);
      return;
    }

    try {
      const windowObj = window as unknown as {
        webkitSpeechRecognition: new () => {
          continuous: boolean;
          interimResults: boolean;
          lang: string;
          onresult: (e: { results: { [key: number]: { [key: number]: { transcript: string } } } }) => void;
          onerror: (e: { error: string }) => void;
          onend: () => void;
          start: () => void;
          stop: () => void;
        };
      };

      const recognition = new windowObj.webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-GB';

      if (!isListening) {
        recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          if (transcript) {
            onTranscript(transcript);
          }
          setIsListening(false);
        };

        recognition.onerror = (event) => {
          if (event.error === 'not-allowed') {
            setErrorMessage('Microphone access was denied. Please allow microphone permissions or use keyboard typing.');
          } else {
            setErrorMessage('Could not hear audio clearly. Please try speaking again or use text.');
          }
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognition.start();
        setIsListening(true);
      } else {
        recognition.stop();
        setIsListening(false);
      }
    } catch (err) {
      console.error(err);
      setErrorMessage('Voice recognition encountered an error. Please type below.');
      setIsListening(false);
    }
  };

  return (
    <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
      <button
        type="button"
        onClick={handleToggleVoice}
        className={isListening ? 'pulse-listening' : ''}
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          border: 'none',
          backgroundColor: isListening ? '#DC2626' : '#F4F4F5',
          color: isListening ? '#FFFFFF' : 'var(--store-text-secondary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 150ms ease'
        }}
        aria-label={isListening ? 'Stop voice listening' : 'Start voice speech search'}
        title={isListening ? 'Listening... Speak now' : 'Speak your shopping request'}
      >
        {isListening ? <MicOff size={18} /> : <Mic size={18} />}
      </button>

      {/* Floating Permission/Error Alert */}
      {errorMessage && (
        <div
          style={{
            position: 'absolute',
            bottom: '50px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: '#18181B',
            color: '#FFFFFF',
            fontSize: '0.75rem',
            padding: '8px 14px',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-lg)',
            width: '240px',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'flex-start',
            gap: '6px'
          }}
        >
          <AlertCircle size={14} style={{ color: '#F59E0B', flexShrink: 0, marginTop: '2px' }} />
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
}
