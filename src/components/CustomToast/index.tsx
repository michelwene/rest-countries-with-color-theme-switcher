import { Button, useToast, Wrap, WrapItem } from "@chakra-ui/react";

interface CustomToastProps {
  statusMessage: string;
  message: string;
}

export function CustomToast({ statusMessage, message }: CustomToastProps) {
  const toast = useToast();

  return (
    <Wrap>
      <WrapItem>
        <Button
          onClick={() =>
            toast({
              title: `${statusMessage}`,
              status: statusMessage as "success" | "error" | "warning" | "info",
              isClosable: true,
            })
          }
        >
          {message}
        </Button>
      </WrapItem>
    </Wrap>
  );
}
