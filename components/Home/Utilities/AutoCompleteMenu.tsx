import React, {useState, ChangeEvent} from 'react';

import {
    Icon,
    InputGroup,
    InputRightElement,
    HStack,
    useColorModeValue, IconButton
} from "@chakra-ui/react";

import {AutoComplete, AutoCompleteInput, AutoCompleteItem, AutoCompleteList} from "@choc-ui/chakra-autocomplete";
import {FiChevronDown, FiChevronRight, FiX} from "react-icons/fi";
import FormElement from "@/components/Utilities/FormComponents/FormElement";

interface Props<T> {
    label: string;
    description?: string;
    value: T | null;
    inputValue: string;
    setInputValue: (inputValue: string) => void;
    optionLabels: string[];
    options: T[];
    onSelect: (value: T | null) => void;
    onBlur?: () => void;
    error?: string;
    placeholder?: string;
    closeButton?: boolean;
}

const AutoCompleteMenu = <T,>({ label, description, value, inputValue, setInputValue, options, optionLabels, onSelect, onBlur, error, placeholder, closeButton }: Props<T>) => {

    const menuBackground = useColorModeValue('white', '#2D2D2D');
    const menuBorderColor = useColorModeValue("gray.200", "whiteAlpha.300");

    const [inputRef, setInputRef] = useState<HTMLInputElement | null>(null);

    return (
        <FormElement
            label={label}
            error={error}
            description={description}
        >
            <AutoComplete
                openOnFocus
                restoreOnBlurIfEmpty={false}
            >
                {({ isOpen, onOpen, onClose }: { isOpen: boolean, onOpen: () => {}, onClose: () => {} }) => (
                    <HStack>
                        <InputGroup>
                            <AutoCompleteInput
                                variant="outline"
                                value={inputValue}
                                placeholder={placeholder}
                                focusBorderColor="brand.500"
                                onBlur={onBlur}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                    if (e.target.value === "") {
                                        onSelect(null);
                                    }
                                    setInputValue(e.target.value);
                                }}
                                ref={setInputRef}
                            />
                            <InputRightElement>
                                <Icon
                                    as={isOpen ? FiChevronRight : FiChevronDown}
                                    onClick={() => {
                                        if (isOpen) {
                                            onClose();
                                        } else {
                                            onOpen();
                                            inputRef?.focus();
                                        }
                                    }}
                                    _hover={{ cursor: 'pointer' }}
                                />
                            </InputRightElement>
                        </InputGroup>
                        {
                            inputValue && (
                                <AutoCompleteList
                                    bg={menuBackground}
                                    p={0}
                                    border='1px solid'
                                    borderColor={menuBorderColor}
                                >
                                    {(options).map((option, id) => (
                                        <AutoCompleteItem
                                            key={`option-${id}`}
                                            value={optionLabels[id]}
                                            textTransform="capitalize"
                                            m={0}
                                            onClick={() => {
                                                onSelect(option)
                                            }}
                                        >
                                            {optionLabels[id]}
                                        </AutoCompleteItem>
                                    ))}
                                </AutoCompleteList>
                            )
                        }
                        {
                            (closeButton && value != null) && (
                                <IconButton
                                    aria-label={'clear'}
                                    icon={<Icon as={FiX} />}
                                    onClick={() => {
                                        onSelect(null);
                                        setInputValue("");
                                    }}
                                />
                            )
                        }
                    </HStack>
                )}
            </AutoComplete>
        </FormElement>
    );
};

export default AutoCompleteMenu;
