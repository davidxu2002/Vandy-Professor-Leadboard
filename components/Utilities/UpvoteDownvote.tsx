import React, {MouseEventHandler} from 'react';

import {IconProps, Text, VStack} from "@chakra-ui/react";
import {ChevronDownIcon, ChevronUpIcon} from "@chakra-ui/icons";

import {VoteStatus} from "@/types/Vote";

interface Props {
    onUpvote: () => Promise<void>,
    onDownvote: () => Promise<void>,
    voteStatus: VoteStatus,
    score: number,
    iconSize?: string,
    scoreSize?: string
}

const UpvoteDownvote: React.FC<Props> = ({ onUpvote, onDownvote, voteStatus, score, iconSize = "2rem", scoreSize }) => {

    const iconStyles: IconProps = {
        boxSize: iconSize,
        _hover: {
            cursor: 'pointer',
            opacity: 0.5
        },
        transition: 'all 0.2s ease-in-out'
    }

    const handleUpvote: MouseEventHandler<SVGElement> = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        await onUpvote();
    }

    const handleDownvote: MouseEventHandler<SVGElement> = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        await onDownvote();
    }

    return (
        <VStack
            spacing={0}
        >
            <ChevronUpIcon
                {...iconStyles}
                color={voteStatus === VoteStatus.UPVOTED ? 'green.500' : undefined}
                onClick={handleUpvote}
            />
            <Text
                fontWeight={'bold'}
                fontSize={scoreSize}
            >
                {score}
            </Text>
            <ChevronDownIcon
                {...iconStyles}
                color={voteStatus === VoteStatus.DOWNVOTED ? 'red.500' : undefined}
                onClick={handleDownvote}
            />
        </VStack>
    );
};

export default UpvoteDownvote;
