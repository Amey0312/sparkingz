import React from 'react';
import ServiceContent from './ServiceContent';

// This function runs on the server at build-time
export async function generateStaticParams() {
  return [
    { id: 'security-services' },
    { id: 'building-painting-service' },
    { id: 'housekeeping-services' },
    { id: 'interior-designing' },
    { id: 'old-age-housing' },
    { id: 'paying-guest-accommodation' },
  ];
}

export default function ServiceRoutePage() {
  // Render the Client Component with layout structure safely inside
  return <ServiceContent />;
}