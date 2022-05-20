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

type CountryData = {
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
    console.log(data);
  })();

  return (
    <Box as="section">
      <Header />
      <VStack
        width="90vw"
        mx="auto"
        alignItems="flex-start"
        spacing={16}
        mt={16}
      >
        <Button leftIcon={<BsArrowLeft />}>Back</Button>
        <Flex>
          <Image src="" alt={`Bandeira`} />
          <Box>
            <Heading as="h2">Belgium</Heading>
            <Flex>
              <Box>
                <Text>
                  <strong>Native Name: </strong>
                  Belgiê
                </Text>
                <Text>
                  <strong>Population: </strong>
                  11.319.511
                </Text>
                <Text>
                  <strong>Region: </strong>
                  Europe
                </Text>
                <Text>
                  <strong>SubsRegion: </strong>
                  Western Europe
                </Text>
                <Text>
                  <strong>Capital: </strong>
                  Brussels
                </Text>
              </Box>
              <Box>
                <Text>
                  <strong>Top Level Domain: </strong>
                  .be
                </Text>
                <Text>
                  <strong>Currencies: </strong>
                  Euro
                </Text>
                <Text>
                  <strong>Languages: </strong>
                  Dutch, French, German
                </Text>
              </Box>
            </Flex>
            <Flex>
              <Text>Border Countries</Text>
              <Text>France</Text>
              <Text>Germany</Text>
              <Text>Netherlands</Text>
            </Flex>
          </Box>
        </Flex>
      </VStack>
    </Box>
  );
}
