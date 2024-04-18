import { Card } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

export interface CharacterCardProps {
  character: {
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
  };
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  return (
    <Link to={`/characters/${character.name}`} style={{ textDecoration: 'none' }}>
      <Card
        hoverable
        style={{ marginBottom: '16px' }}
        cover={<img alt={character.name} src={character.image} />}
      >
        <Card.Meta
          title={character.name}
          description={
            <div>
              <p>Status: {character.status}</p>
              <p>Species: {character.species}</p>
              {character.type && <p>Type: {character.type}</p>}
              <p>Gender: {character.gender}</p>
              <p>Origin: {character.origin.name}</p>
            </div>
          }
        />
      </Card>
    </Link>
  );
};

export default CharacterCard;