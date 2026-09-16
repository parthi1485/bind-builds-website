'use client';
import {useEffect} from 'react';
export default function Reveal(){useEffect(()=>{const els=[...document.querySelectorAll<HTMLElement>('.reveal')];if(!('IntersectionObserver'in window)){els.forEach(e=>e.classList.add('is-visible'));return}const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');io.unobserve(e.target)}}),{threshold:.12,rootMargin:'0px 0px -5% 0px'});els.forEach(e=>io.observe(e));return()=>io.disconnect()},[]);return null}
