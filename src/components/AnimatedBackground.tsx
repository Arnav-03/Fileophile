import React from 'react';
import Head from 'next/head';

import { File, FileJson, FileImage, FileVideo, FileAudio, FileCode, FileArchive } from 'lucide-react';

interface FileIconProps {
  IconComponent: React.ComponentType;
  delay: number;
  duration: number;
  initialPos: {
    x: number;
    y: number;
  };
}

const FileIcon: React.FC<FileIconProps> = ({ IconComponent, delay, duration, initialPos }) => {
  return (
    <div
      className="absolute "
      style={{
        top: `${initialPos.y}vh`,
        left: `${initialPos.x}vw`,
        animation: `float ${duration}s ease-in-out ${delay}s infinite alternate`,
        color: 'rgba(255, 255, 255, 0.2)',
      }}
    >
      <IconComponent   />
    </div>
  );
};

// Main AnimatedBackground component
const AnimatedBackground: React.FC = () => {
  const fileIcons = [
    File,
    FileJson,
    FileImage,
    FileVideo,
    FileAudio,
    FileCode,
    FileArchive,
  ];

  const icons = React.useMemo(() => {
    return Array.from({ length: 24 }).map(() => ({
      IconComponent: fileIcons[Math.floor(Math.random() * fileIcons.length)],
      delay: Math.random() * 5,
      duration: 15 + Math.random() * 15,
      initialPos: {
        x: Math.random() * 100,
        y: Math.random() * 100,
      },
    }));
  }, [fileIcons]);

  return (
    <>
      <Head>
        <title>Animated Background</title>
        <style>{`
          @keyframes float {
            from { transform: translateY(0); }
            to { transform: translateY(-10px); }
          }
          .animate-line {
            stroke: rgba(255, 255, 255, 0.1);
          }
        `}</style>
      </Head>

      <div className="fixed inset-0 z-0 overflow-hidden">
        <svg className="absolute inset-0 w-full h-full">
          {Array.from({ length: 8 }).map((_, i) => (
            <line
              key={i}
              className="animate-line"
              strokeWidth="1"
              strokeDasharray="5,5"
              style={{
                animation: `moveLine ${20 + i * 5}s linear infinite`,
                animationDelay: `${i * 2}s`,
              }}
            >
              <animate attributeName="x1" values="0;100;0" dur={`${20 + i * 5}s`} repeatCount="indefinite" />
              <animate attributeName="y1" values={`${i * 10};${(i + 5) * 10};${i * 10}`} dur={`${20 + i * 5}s`} repeatCount="indefinite" />
              <animate attributeName="x2" values="100;0;100" dur={`${20 + i * 5}s`} repeatCount="indefinite" />
              <animate attributeName="y2" values={`${(i + 5) * 10};${i * 10};${(i + 5) * 10}`} dur={`${20 + i * 5}s`} repeatCount="indefinite" />
            </line>
          ))}
        </svg>

        {icons.map((props, index) => (
          <FileIcon key={index} {...props} />
        ))}
      </div>
    </>
  );
};

export default AnimatedBackground;
