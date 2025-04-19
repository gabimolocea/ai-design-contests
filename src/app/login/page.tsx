'use client';

import { useRouter } from 'next/navigation';
import { AuthModal } from '@/app/components/auth-modal';

export default function LoginPage() {
  const router = useRouter();

  // Handle redirection to the dashboard after successful login or registration
  const handleAuthSuccess = () => {
    router.push('/dashboard'); // Redirect to the dashboard
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('/path-to-your-background-image.jpg')", // Replace with your background image path
      }}
    >
      {/* Centered AuthModal */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <AuthModal
          isOpen={true} // Keep the modal always open
          closeModal={() => {}} // Disable the ability to close the modal
          onSuccess={handleAuthSuccess} // Redirect to dashboard on success
          hideCloseIcon={true} // Hide the close icon
          disableOpacityLayer={true} // Remove the opacity layer
        />
      </div>
    </div>
  );
}