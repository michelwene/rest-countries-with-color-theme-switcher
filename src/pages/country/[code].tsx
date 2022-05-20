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
import { useEffect, useState } from "react";
import Link from "next/link";
import { CountryData } from "../../types/country";

type CountryBorders = {
  borders: string[];
};

type CountriesName = {
  name: string;
};

export default function Country() {
  const [country, setCountry] = useState<CountryData>();
  const [nameCountry, setNameCountry] = useState<CountriesName[]>([]);
  const { query } = useRouter();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get(`/alpha/${query.code}`);
        setCountry(data);
        searchCountries(data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [query.code]);

  async function searchCountries(value: CountryBorders) {
    try {
      const { data } = await api.get(`/alpha?codes=${value.borders}`);
      setNameCountry(data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Box as="section" height={["100vh"]}>
      <Header />
      <VStack
        width={["95vw", "90vw"]}
        mx="auto"
        alignItems={["center", "center", "center", "flex-start"]}
        spacing={16}
        mt={16}
      >
        <Link href="/" passHref>
          <Button leftIcon={<BsArrowLeft />}>Back</Button>
        </Link>
        <Flex
          gap={[4, 8, 16, 32]}
          align="center"
          flexDirection={["column", "column", "column", "row"]}
          pb={8}
        >
          <Image
            src={country?.flag}
            alt={`Bandeira ${country?.name}`}
            width={["100%", "80%", "80%", "40%"]}
          />
          <Box height="100%">
            <Heading as="h2" mb={8} textAlign={["center", "left"]}>
              {country?.name}
            </Heading>
            <Flex
              gap={[16, 32]}
              mb={16}
              flexDirection={["column", "column", "column", "row"]}
              align={["flex-start", "flex-start"]}
            >
              <Flex flexDirection="column" gap={2}>
                <Text>
                  <strong>Native Name: </strong>
                  {country?.nativeName}
                </Text>
                <Text>
                  <strong>Population: </strong>
                  {country?.population.toLocaleString()}
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
                  {country?.languages?.map((language) => language.name + " ")}
                </Text>
              </Flex>
            </Flex>
            <Flex
              gap={4}
              align={["center"]}
              flex="1"
              flexDirection={["column"]}
            >
              <Box>
                <Text fontWeight={700}>Border Countries: </Text>
              </Box>
              <Flex
                gap={4}
                flexDirection={["column", "row"]}
                wrap={"wrap"}
                justifyContent="center"
              >
                {nameCountry?.map((country) => (
                  <>
                    <Box key={country.name}>
                      <Text
                        textAlign="center"
                        border="1px"
                        borderColor="gray.200"
                        py={1}
                        width="150px"
                        borderRadius={4}
                        boxShadow="md"
                      >
                        {country.name}
                      </Text>
                    </Box>
                  </>
                ))}
              </Flex>
            </Flex>
          </Box>
        </Flex>
      </VStack>
    </Box>
  );
}
