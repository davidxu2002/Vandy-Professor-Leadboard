import React from 'react';

import {Button, HStack, LightMode} from "@chakra-ui/react";

import TextInput from "@/components/Utilities/FormComponents/TextInput";

import useCreateComment from "@/hooks/mutators/useCreateComment";

// import filter from "leo-profanity";


interface Props {
    reviewId: string
}

const WriteComment: React.FC<Props> = ({ reviewId }) => {

    const { values, setFieldValue, setFieldTouched, touched, errors, disabled, handleSubmit} = useCreateComment(reviewId);

    return (
        <HStack
            w={'100%'}
        >
            <TextInput
                label={"Add Comment"}
                placeholder={"Write your comment here"}
                value={values.content}
                onChange={(value) => setFieldValue("content", value)}
                error={touched.content ? errors.content : undefined}
                onBlur={() => {
                    var cleanComment = values.content
                    setFieldValue("content", cleanComment)
                    setFieldTouched("content", true)
                }}
                button={
                    <LightMode>
                        <Button 
                            bg="gray.500"
                            color = 'black'
                            _hover={{bg: '#2B7A78'}}
                            isDisabled={disabled}
                            onClick={() => handleSubmit()}
                        >
                            Submit
                        </Button>
                    </LightMode>
                }
            />
        </HStack>
    );
};

export default WriteComment;
