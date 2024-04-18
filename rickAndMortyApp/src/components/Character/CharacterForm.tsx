import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select } from 'antd';

const { Option } = Select;

interface CharacterFormProps {
  searchParams: URLSearchParams;
  setSearchParams: React.Dispatch<React.SetStateAction<URLSearchParams>>;
  handleSortChange: () => void;
  resetFilters: () => void;
}

const CharacterForm: React.FC<CharacterFormProps> = ({
  searchParams,
  setSearchParams,
  handleSortChange,
  resetFilters
}) => {
  const updateSearchParams = (name: string, value: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set(name, value);
    setSearchParams(newSearchParams);
  };

  return (
    <Form layout="inline">
      <Form.Item>
        <Input
          placeholder="Enter character name"
          value={searchParams.get('name') || ''}
          onChange={(e) => updateSearchParams('name', e.target.value)}
        />
      </Form.Item>
      <Form.Item>
        <Select
          value={searchParams.get('status') || ''}
          onChange={(value) => updateSearchParams('status', value)}
          style={{ width: 120 }}
        >
          <Option value="">All</Option>
          <Option value="alive">Alive</Option>
          <Option value="dead">Dead</Option>
          <Option value="unknown">Unknown</Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <Select
          value={searchParams.get('species') || ''}
          onChange={(value) => updateSearchParams('species', value)}
          style={{ width: 120 }}
        >
          <Option value="">All</Option>
          <Option value="human">Human</Option>
          <Option value="alien">Alien</Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" icon={searchParams.get('sort') === 'asc' ? <DownOutlined /> : <UpOutlined />} onClick={handleSortChange}>
          Sort
        </Button>
      </Form.Item>
      <Form.Item>
        <Button onClick={resetFilters}>
          Reset
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CharacterForm;