import React from 'react';

import {Card, Flex, VStack} from "@chakra-ui/react";

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
}

const ExploreHeader: React.FC<Props> = ({ subjectId, setSubjectId, professor, setProfessor, sortBy, setSortBy }) => {
    return (
        <Card
            width={'100%'}
            p={'4'}
        >
            <VStack
                width={'100%'}
                spacing={8}
                alignItems={'flex-start'}
            >
                <Flex
                    justifyContent={'space-between'}
                    alignItems={'flex-end'}
                    gap={4}
                    w={'100%'}
                    flexDirection={{ base: 'column', md: 'row' }}
                >
                    <InstantSearch
                        searchClient={searchClient}
                        indexName={subjectIndex}
                    >
                        <SubjectMenu
                            subjectId={subjectId}
                            setSubjectId={setSubjectId}
                        />
                    </InstantSearch>
                    <InstantSearch searchClient={searchClient} indexName={professorIndex}>
                        <ProfessorMenu
                            professor={professor}
                            setProfessor={setProfessor}
                        />
                    </InstantSearch>
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
