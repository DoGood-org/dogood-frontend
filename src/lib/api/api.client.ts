'use client';
import axios from 'axios';

export const apiClientGuest = axios.create({
  baseURL: '/api/auth',
  withCredentials: true,
});

export const apiClientAuth = axios.create({
  baseURL: '/api/proxy',
  withCredentials: true,
});
