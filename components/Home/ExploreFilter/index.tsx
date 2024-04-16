import React from 'react';

import {Card, Flex, FormLabel, VStack, NumberInput, NumberInputField,   NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,} from "@chakra-ui/react";

import ProfessorMenu from '../Utilities/FormComponents/ProfessorMenu';
import SubjectMenu from '../Utilities/FormComponents/SubjectMenu';
import SortByRadio from "@/components/Utilities/FilterRadioSort";

import {Professor} from "@/types/Professor";
import {SortBy} from "@/types/SortBy";
import searchClient, {subjectIndex, professorIndex} from '@/algolia/index';
import {InstantSearch} from "react-instantsearch";
import { Subject } from '@/types/Subject';

interface Props {
    subjectId: string | null,
    setSubjectId: (subjectId: string | null) => void,
    professor: Professor | null,
    setProfessor: (professor: Professor | null) => void,
    sortBy: SortBy,
    setSortBy: (sortBy: SortBy) => void,
    numProf: number,
    setNumProf: (numProf: number) => void,
}

const ExploreHeader: React.FC<Props> = ({ subjectId, 
    setSubjectId, 
    professor, 
    setProfessor, 
    sortBy, 
    setSortBy,
    numProf,
    setNumProf}) => {

    const handleNumberChange = (valueString) => {
        const newValue = parseInt(valueString, 10);
        setNumProf(newValue);
    };

    return (
        <Card
            width={'100%'}
            p={'4'}
        >
            <VStack
                width={'100%'}
                spacing={2}
                alignItems={'flex-start'}
            >
                <Flex
                    justifyContent={'space-between'}
                    alignItems={'flex-end'}
                    gap={4}
                    w={'100%'}
                    flexDirection={{ base: 'column', md: 'row' }}
                >
                    <FormLabel>
                    Department
                    </FormLabel>
                    <InstantSearch
                        searchClient={searchClient}
                        indexName={subjectIndex}
                    >
                        <SubjectMenu
                            subjectId={subjectId}
                            setSubjectId={setSubjectId}
                        />
                    </InstantSearch>
                    
                    <FormLabel>
                    Places
                    </FormLabel>
                    <NumberInput step={1} value={numProf ? numProf : 1} min={1} onChange={handleNumberChange}>
                        <NumberInputField/>  
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                </Flex>
                <SortByRadio
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                />
            </VStack>
        </Card>
    );
};

export default ExploreHeader;
