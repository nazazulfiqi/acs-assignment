import React, { FC } from 'react';

interface Props {
  hScreen?: boolean;
}

const LoadingDots: FC<Props> = ({ hScreen = false }) => {
  return (
    <div
      className={`${
        hScreen ? 'h-screen' : ''
      } flex items-center justify-center space-x-2 bg-white dark:bg-slate-950`}
    >
      <span className='sr-only'>Loading...</span>
      <div className='h-6 w-6 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]'></div>
      <div className='h-6 w-6 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]'></div>
      <div className='h-6 w-6 animate-bounce rounded-full bg-primary'></div>
    </div>
  );
};

export default LoadingDots;
