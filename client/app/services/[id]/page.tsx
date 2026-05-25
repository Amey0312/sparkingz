import React from 'react';
import ServiceContent from './ServiceContent';

// This function runs on the server at build-time
export async function generateStaticParams() {
  return [
    { id: 'design-project' },
    { id: 'interior-decoration' },
    { id: 'project-visualization' },
    { id: 'selection-purchase' },
    { id: 'project-management' },
    { id: 'repair-reconstruction' },
  ];
}

export default function ServiceRoutePage() {
  // Render the Client Component with layout structure safely inside
  return <ServiceContent />;
}