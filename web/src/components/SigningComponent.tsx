import { useEffect } from "react";

interface SigningComponentProps {
  embeddedSigningUrl: string;
  onClose: () => void;
}

const SigningComponent = ({
  embeddedSigningUrl,
  onClose,
}: SigningComponentProps) => {
  useEffect(() => {
    const signWellEmbed = new (window as any).SignWellEmbed({
      url: embeddedSigningUrl,
      events: {
        completed: (e: any) => {
          onClose();
          console.log("completed event: ", e);
        },
        closed: (e: any) => {
          onClose();
          console.log("closed event: ", e);
        },
      },
    });

    signWellEmbed.open();

    return () => {
      signWellEmbed.close();
    };
  }, [embeddedSigningUrl, onClose]);

  return null;
};

export default SigningComponent;
