import { Alert, Col, Row, Spin } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import CharacterCard from './CharacterCard';
import CharacterForm from './CharacterForm';

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  image: string;
}

const CharacterCards = () => {
  const [allCharacters, setAllCharacters] = useState<Character[]>([]);
  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://rickandmortyapi.com/api/character?page=${page}&limit=20`);
        if (page === 1) {
          setAllCharacters(response.data.results);
          setFilteredCharacters(response.data.results);
        } else {
          setAllCharacters(prevCharacters => [...prevCharacters, ...response.data.results]);
          setFilteredCharacters(prevCharacters => [...prevCharacters, ...response.data.results]);
        }
      } catch (error) {
        setError('Failed to fetch characters. Please check your internet connection.');
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, [page]); 

  const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const fullHeight = document.documentElement.offsetHeight;

    if (windowHeight + scrollTop >= fullHeight && !loading) {
      setPage(prevPage => prevPage + 1); 
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]); 
  useEffect(() => {
    const filterData = () => {
      const filteredData = allCharacters.filter((character) => {
        return (!searchParams.get('name') || (searchParams.get('name') && character.name.toLowerCase().includes(searchParams.get('name')!.toLowerCase()))) &&
          (!searchParams.get('status') || (searchParams.get('status') && character.status.toLowerCase().includes(searchParams.get('status')!.toLowerCase()))) &&
          (!searchParams.get('species') || (searchParams.get('species') && character.species.toLowerCase().includes(searchParams.get('species')!.toLowerCase()))) &&
          (!searchParams.get('gender') || (searchParams.get('gender') && character.gender.toLowerCase().includes(searchParams.get('gender')!.toLowerCase())));
      });
      setFilteredCharacters(filteredData);
    };

    filterData();
  }, [searchParams, allCharacters]);

  const applySorting = (characters: any[], sortOrder: string) => {
    return characters.sort((a: { name: string; }, b: { name: string; }) => {
      let propA = a.name.toLowerCase();
      let propB = b.name.toLowerCase();
      if (propA < propB) {
        return sortOrder === 'asc' ? -1 : 1;
      }
      if (propA > propB) {
        return sortOrder === 'asc' ? 1 : -1;
      }
      return 0;
    });
  };

  useEffect(() => {
    const sort = searchParams.get('sort');
    if (sort) {
      const sortedCharacters = applySorting([...filteredCharacters], sort);
      setFilteredCharacters(sortedCharacters);
    }
  }, [searchParams.get('sort'), filteredCharacters]);

  const handleSortChange = () => {
    const currentSort = searchParams.get('sort') === 'asc' ? 'desc' : 'asc';

    const sortedCharacters = applySorting([...filteredCharacters], currentSort);
    setFilteredCharacters(sortedCharacters);

    setSearchParams({ ...Object.fromEntries(searchParams.entries()), sort: currentSort });
  };

  const resetFilters = () => {
    setSearchParams({});
    setFilteredCharacters(allCharacters);
  };

  if (loading) {
    return <Spin size="large" />;
  }

  if (error) {
    return <Alert message={error} type="error" />;
  }

  return (
    <div style={{ padding: '24px' }}>
      <CharacterForm
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        handleSortChange={handleSortChange}
        resetFilters={resetFilters}
      />
      <h1>Character Cards</h1>
      <Row gutter={16}>
        {filteredCharacters.map((character: Character) => (
          <Col key={character.id} xs={24} sm={12} md={8} lg={6}>
            <CharacterCard character={character} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default CharacterCards;