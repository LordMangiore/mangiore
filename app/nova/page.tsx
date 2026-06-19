import type { Metadata } from 'next';
import Gate from '@/components/nova/Gate';
import NovaDemo from '@/components/nova/NovaDemo';

export const metadata: Metadata = {
  title: 'N.O.V.A. — the building blocks',
  robots: { index: false, follow: false },
};

export default function NovaDemoPage() {
  return (
    <Gate>
      <NovaDemo />
    </Gate>
  );
}
