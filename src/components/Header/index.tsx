import { Button, Flex, Heading, useColorMode } from "@chakra-ui/react";
import { FiMoon } from "react-icons/fi";

export function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex as="header" p={4} boxShadow="md">
      <Flex justifyContent="space-between" width="90vw" mx="auto">
        <Heading as="h1">Where in the world</Heading>
        <Button onClick={toggleColorMode} leftIcon={<FiMoon />} variant="ghost">
          {colorMode === "light" ? "Dark" : "Light"} Mode
        </Button>
      </Flex>
    </Flex>
  );
}
