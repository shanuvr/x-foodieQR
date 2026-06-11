import React from 'react';
import UserLayout from '../../layouts/UserLayout';
import Hero from '../../components/Hero';
import HotelListings from '../../components/HotelListings';

export default function Home() {
  return (
    <UserLayout>
      <div className="w-full pb-24">
        <Hero />
        <HotelListings />
      </div>
    </UserLayout>
  );
}
