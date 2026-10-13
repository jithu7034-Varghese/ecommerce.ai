import { redirect } from 'next/navigation';

export default function OrderConfirmationPage() {
  redirect('/merchant/orders');
}
