import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Header } from "../../components/Header";
import { BsArrowLeft } from "react-icons/bs";
import { useRouter } from "next/router";
import { api } from "../../services/api";
import { useState } from "react";
import Link from "next/link";

type CountryData = {
  flag: string;
  name: string;
  nativeName: string;
  population: number;
  region: string;
  subregion: string;
  capital: string;
  topLevelDomain: string[];
  currencies: [
    {
      name: string;
    }
  ];
  languages: [
    {
      name: string;
    }
  ];
  borders: string[];
};

export default function Country() {
  const [country, setCountry] = useState<CountryData>();
  const { query } = useRouter();

  (async () => {
    const { data } = await api.get(`/alpha/${query.code}`);
    setCountry(data);
  })();

  return (
    <Box as="section" height={["100vh"]}>
      <Header />
      <VStack
        width={["100vw", "90vw"]}
        mx="auto"
        alignItems="flex-start"
        spacing={16}
        mt={16}
      >
        <Link href="/" passHref>
          <Button leftIcon={<BsArrowLeft />}>Back</Button>
        </Link>
        <Flex gap={32} align="center" flexDirection={["column"]} pb={8}>
          <Image
            src={country?.flag}
            alt={`Bandeira ${country?.name}`}
            width="40%"
          />
          <Box height="100%">
            <Heading as="h2" mb={8} textAlign={["center", "left"]}>
              Belgium
            </Heading>
            <Flex
              gap={[16, 32]}
              mb={16}
              flexDirection={["column"]}
              align={["flex-start", "flex-start"]}
            >
              <Flex flexDirection="column" gap={2}>
                <Text>
                  <strong>Native Name: </strong>
                  {country?.nativeName}
                </Text>
                <Text>
                  <strong>Population: </strong>
                  {country?.population}
                </Text>
                <Text>
                  <strong>Region: </strong>
                  {country?.region}
                </Text>
                <Text>
                  <strong>SubsRegion: </strong>
                  {country?.subregion}
                </Text>
                <Text>
                  <strong>Capital: </strong>
                  {country?.capital}
                </Text>
              </Flex>
              <Flex flexDirection="column" gap={2}>
                <Text>
                  <strong>Top Level Domain: </strong>
                  {country?.topLevelDomain}
                </Text>
                <Text>
                  <strong>Currencies: </strong>
                  {country?.currencies?.map((currency) => currency.name)}
                </Text>
                <Text>
                  <strong>Languages: </strong>
                  {country?.languages?.map((language) => language.name)}
                </Text>
              </Flex>
            </Flex>
            <Flex gap={4} align="center" flex="1" flexDirection={["column"]}>
              <Text fontWeight={700}>Border Countries: </Text>
              <Text
                textAlign="center"
                border="1px"
                borderColor="gray.200"
                py={1}
                width="150px"
                borderRadius={4}
                boxShadow="md"
              >
                France
              </Text>
              <Text
                textAlign="center"
                border="1px"
                borderColor="gray.200"
                py={1}
                width="150px"
                borderRadius={4}
                boxShadow="md"
              >
                Germany
              </Text>
              <Text
                textAlign="center"
                border="1px"
                borderColor="gray.200"
                py={1}
                width="150px"
                borderRadius={4}
                boxShadow="md"
              >
                Netherlands
              </Text>
            </Flex>
          </Box>
        </Flex>
      </VStack>
    </Box>
  );
}
