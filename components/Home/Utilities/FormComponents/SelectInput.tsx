import React from 'react';

import {
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem
} from '@chakra-ui/react';
import {ChevronDownIcon} from "@chakra-ui/icons";

import FormElement from "@/components/Utilities/FormComponents/FormElement";

interface Props {
    options: string[] | null,
    selectedOption: string | null,
    setSelectedOption: (selected: String | null) => void,
    error?: string,
    description?: string,
}
const SelectInput: React.FC<Props>  = ( {options, selectedOption, setSelectedOption, error, description} ) => {

  return (
    <FormElement
      label={"Select a report type"}
      error={error}
      description={description}
    >
      <Menu>
        <MenuButton
            as={Button}
            rightIcon={<ChevronDownIcon />}
        >
          {selectedOption}
        </MenuButton>
        <MenuList>
          {options?.map((option, index) => (
            <MenuItem
                key={index}
                onClick={() => setSelectedOption(option)}
            >
                {option}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </FormElement>
  );
};
export default SelectInput;