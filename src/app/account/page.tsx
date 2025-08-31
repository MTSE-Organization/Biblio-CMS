import AccountList from '@/app/account/account-list';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tài khoản'
};

export default function AccountPage() {
  return (
    <div>
      <AccountList />
    </div>
  );
}
