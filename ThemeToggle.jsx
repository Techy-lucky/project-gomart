import React, { useState, useEffect } from 'react';

const ThemeToggle = () => {
  const [isChecked, setIsChecked] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });

  useEffect(() => {
    localStorage.setItem('theme', isChecked ? 'dark' : 'light');
    
    document.body.style.backgroundImage = isChecked ? 
      'url("./src/images/img/graybg2.png")' : 
      // 'url("./src/images/img/lightbg1.png")';
    
    // Add font color change
    document.body.style.color = isChecked ? '#ffffff' : '#000000';
  }, [isChecked]);

  return (
    <label
      className="relative h-8 w-12 cursor-pointer [-webkit-tap-highlight-color:_transparent]"
      htmlFor="switch"
    >
      <input 
        className="peer sr-only" 
        id="switch" 
        type="checkbox"
        checked={isChecked}
        onChange={() => setIsChecked(!isChecked)}
      />

      <span className="absolute inset-0 m-auto h-2 rounded-full bg-stone-400"></span>

      <span
        className="absolute inset-y-0 start-0 m-auto size-6 rounded-full bg-stone-600 transition-all peer-checked:start-6 peer-checked:[&>*]:scale-0"
      >
        <span
          className="absolute inset-0 m-auto size-4 rounded-full bg-stone-300 transition"
        >
        </span>
      </span>
    </label>
  );
};

export default ThemeToggle;