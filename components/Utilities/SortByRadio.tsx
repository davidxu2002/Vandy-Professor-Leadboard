import React from 'react';

import {HStack, Radio, RadioGroup, Stack, Text} from "@chakra-ui/react";

import {SortByComment} from "@/types/SortByComment";

interface Props {
    sortByComment: SortByComment,
    setSortByComment: (sortByComment: SortByComment) => void,
}

const SortByRadio: React.FC<Props> = ({sortByComment, setSortByComment}) => {
    return (
        <HStack
            spacing={4}
            marginTop={2}
        >
            <Text
                color={'blackAlpha.900'}
            >
                Sort By:
            </Text>
            <RadioGroup
                onChange={setSortByComment}
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