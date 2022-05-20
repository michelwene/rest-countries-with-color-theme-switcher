import { GridItem, Heading, Image, Text, VStack } from "@chakra-ui/react";
import { CountryProps } from "../../types/countryItem";

export function CountryItem({
  country,
  population,
  region,
  capital,
  flag,
  onClick,
}: CountryProps) {
  return (
    <GridItem
      boxShadow="md"
      borderRadius={4}
      cursor="pointer"
      onClick={onClick}
    >
      <Image
        src={flag}
        alt={`Bandeira ${country}`}
        height="180px"
        width="100%"
        objectFit="cover"
        borderTopRadius={4}
      />
      <VStack py={6} px={4} alignItems="flex-start">
        <Heading as="h2" fontSize={16}>
          {country}
        </Heading>
        <Text fontSize={12}>
          <strong>Population</strong>: {population}
        </Text>
        <Text fontSize={12}>
          <strong>Region</strong>: {region}
        </Text>
        <Text fontSize={12}>
          <strong>Capital</strong>: {capital}
        </Text>
      </VStack>
    </GridItem>
  );
}
