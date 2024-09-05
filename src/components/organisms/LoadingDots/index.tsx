import React, { FC } from 'react';

interface Props {
  hScreen?: boolean;
}

const LoadingDots: FC<Props> = ({ hScreen = false }) => {
  return (
    <div
      className={`${
        hScreen ? 'h-screen' : ''
      } flex items-center justify-center space-x-2 bg-white dark:invert`}
    >
      <span className='sr-only'>Loading...</span>
      <div className='bg-primary-500 h-6 w-6 animate-bounce rounded-full [animation-delay:-0.3s]'></div>
      <div className='bg-primary-500 h-6 w-6 animate-bounce rounded-full [animation-delay:-0.15s]'></div>
      <div className='bg-primary-500 h-6 w-6 animate-bounce rounded-full'></div>
    </div>
  );
};

export default LoadingDots;
