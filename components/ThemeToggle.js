'use client';

import { useEffect, useState } from "react";


export default function ThemeToggle() {
    const [theme, setTheme] = useState('light');
    useEffect(()=> setTheme(document.documentElement.dataset.theme || 'light'), []);
    function toggle(){
        const next = theme === 'dark' ? 'light' : 'dark';
        document.documentElement.dataset.theme = next;
        try { localStorage.setItem('theme', next);} catch{}
        setTheme(next);
    }
    return <button className="nav-button" onClick={toggle} aria-label="Switch theme">{theme === 'dark' ? '☀' : '☾'}</button>;
}