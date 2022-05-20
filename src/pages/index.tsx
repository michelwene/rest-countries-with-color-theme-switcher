import {
  Box,
  Flex,
  Grid,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  SimpleGrid,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { CountryItem } from "../components/CountryItem";
import { Header } from "../components/Header";
import { api } from "../services/api";
import { AiOutlineSearch } from "react-icons/ai";
import Router from "next/router";

type CountryData = {
  name: string;
  capital: string;
  population: number;
  region: string;
  flags: {
    svg: string;
  };
  alpha3Code: string;
};

export default function Home() {
  const [countries, setCountries] = useState<CountryData[]>([]);
  const [regions, setRegions] = useState<CountryData[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    (async () => {
      const { data } = await api.get("/all");
      data.map((country: any) => {
        country.population = country.population.toLocaleString();
        return country;
      });
      setCountries(data);
      setRegions(data);
    })();
  }, []);

  async function handleSearch() {
    if (!search.trim()) {
      return;
    }

    try {
      const { data } = await api.get(`/name/${search}`);
      data.map((country: any) => {
        country.population = country.population.toLocaleString();
        return country;
      });
      setCountries(data);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleRefetchCountries() {
    try {
      const { data } = await api.get("/all");
      data.map((country: any) => {
        country.population = country.population.toLocaleString();
        return country;
      });
      setCountries(data);
    } catch (err) {
      console.log(err);
    }
  }

  const regionsFilter = Array.from(
    new Set(regions.map((regions) => regions.region))
  );

  async function handleRegionChange(
    event: React.ChangeEvent<HTMLSelectElement>
  ) {
    const { data } = await api.get(`/region/${event.target.value}`);
    data.map((country: any) => {
      country.population = country.population.toLocaleString();
      return country;
    });
    setCountries(data);
  }

  return (
    <Box as="section" mx="auto">
      <Header />
      <Box width="90vw" mx="auto" mt={8}>
        <Flex justifyContent="space-between">
          <InputGroup onKeyUp={() => handleSearch()}>
            <InputLeftElement pointerEvents="none" as="a">
              <AiOutlineSearch size="1.5rem" />
            </InputLeftElement>
            <Input
              placeholder="Search for a country"
              maxWidth="300px"
              onChange={(e) => {
                setSearch(e.target?.value!);
                e.target.value === "" &&
                  (async () => await handleRefetchCountries())();
              }}
              value={search}
            />
          </InputGroup>
          <Select
            placeholder="Filter by Region"
            maxWidth="200px"
            onChange={(e) => handleRegionChange(e)}
          >
            {regionsFilter.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </Select>
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
                onClick={() => {
                  Router.push(`/country/${country.alpha3Code}`);
                }}
              />
            ))}
          </SimpleGrid>
        </Grid>
      </Box>
    </Box>
  );
}
