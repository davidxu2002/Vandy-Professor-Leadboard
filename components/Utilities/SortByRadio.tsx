import React from 'react';

import {HStack, Radio, RadioGroup, Stack, Text} from "@chakra-ui/react";

import {SortByComment} from "@/types/SortByComment";

interface Props {
    sortByComment: SortByComment,
    setSortBy: (sortByComment: SortByComment) => void,
}

const SortByRadio: React.FC<Props> = ({sortByComment, setSortBy}) => {
    return (
        <HStack
            spacing={4}
        >
            <Text>
                Sort By:
            </Text>
            <RadioGroup
                onChange={setSortBy}
                value={sortByComment}
                colorScheme={'brand'}
            >
                <Stack
                    direction='row'
                    spacing={4}
                >
                    {
                        Object.values(SortByComment).map((sort) => (
                            <Radio
                                key={sort}
                                value={sort}
                            >
                                {sort}
                            </Radio>
                        ))
                    }
                </Stack>
            </RadioGroup>
        </HStack>
    );
};

export default SortByRadio;