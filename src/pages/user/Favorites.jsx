import React from 'react';
import UserLayout from '../../layouts/UserLayout';
import HotelListings from '../../components/HotelListings';

export default function Favorites() {
  return (
    <UserLayout>
      <div className="w-full pb-24">
        <HotelListings onlyShowFavorites={true} />
      </div>
    </UserLayout>
  );
}
