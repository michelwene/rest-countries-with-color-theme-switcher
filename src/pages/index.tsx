import {
  Box,
  Flex,
  Grid,
  Input,
  InputGroup,
  InputLeftElement,
  MenuItemOption,
  Select,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { CountryItem } from "../components/CountryItem";
import { Header } from "../components/Header";
import { api } from "../services/api";
import { AiOutlineSearch } from "react-icons/ai";

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
  const [regions, setRegions] = useState<CountryData[]>([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    (async () => {
      const { data } = await api.get("/all");
      setCountries(data);
      setRegions(data);
    })();
  }, []);

  async function handleSearch() {
    try {
      const { data } = await api.get(`/name/${search}`);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleRefetchCountries() {
    try {
      const { data } = await api.get("/all");
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
    setCountries(data);
  }

  return (
    <Box as="section" mx="auto">
      <Header />
      <Box width="90vw" mx="auto" mt={8}>
        <Flex justifyContent="space-between">
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              // eslint-disable-next-line react/no-children-prop
              children={<AiOutlineSearch />}
              cursor="pointer"
            />
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
              />
            ))}
          </SimpleGrid>
        </Grid>
      </Box>
    </Box>
  );
}
