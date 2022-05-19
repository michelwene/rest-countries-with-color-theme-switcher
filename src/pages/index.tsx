import {
  Box,
  Flex,
  Grid,
  Input,
  Select,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { CountryItem } from "../components/CountryItem";
import { Header } from "../components/Header";
import { api } from "../services/api";

type CountryData = {
  name: string;
  capital: string;
  population: number;
  region: string;
  flags: {
    svg: string;
  };
};

export default function Home() {
  const [countries, setCountries] = useState<CountryData[]>([]);
  useEffect(() => {
    (async () => {
      const { data } = await api.get("/all");
      setCountries(data);
    })();
  }, []);

  console.log(countries);
  return (
    <Box as="section" mx="auto">
      <Header />
      <Box width="90vw" mx="auto" mt={8}>
        <Flex justifyContent="space-between">
          <Input placeholder="Search for a country" maxWidth="300px" />
          <Select placeholder="Filter by Region" maxWidth="200px"></Select>
        </Flex>
        <Grid my={8}>
          <SimpleGrid spacing={16} columns={4}>
            {countries.map((country) => (
              <CountryItem
                key={country.name}
                capital={country.capital}
                population={country.population}
                region={country.region}
                country={country.name}
                flag={country.flags.svg}
              />
            ))}
          </SimpleGrid>
        </Grid>
      </Box>
    </Box>
  );
}
