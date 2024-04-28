import { useEffect } from "react";

interface SigningComponentProps {
  embeddedSigningUrl: string;
}

const SigningComponent = ({ embeddedSigningUrl }: SigningComponentProps) => {
  useEffect(() => {
    // Initialize SignWellEmbed object
    const signWellEmbed = new (window as any).SignWellEmbed({
      url: embeddedSigningUrl,
      events: {
        completed: (e: any) => {
          console.log("completed event: ", e);
        },
        closed: (e: any) => {
          console.log("closed event: ", e);
        },
      },
    });

    // Open the SignWell iFrame
    signWellEmbed.open();

    // Clean up function
    return () => {
      // Close the SignWell iFrame when the component unmounts
      signWellEmbed.close();
    };
  }, [embeddedSigningUrl]);

  return <div>{/* Render any additional content if needed */}</div>;
};

export default SigningComponent;
